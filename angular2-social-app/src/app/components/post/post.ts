import { Component, Input } from '@angular/core';
import { Post } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Display a user post with comments and like 
 */
@Component({
    selector: 'post',
    templateUrl: 'post.html'
})
export class PostComponent {
    @Input() post: Post;
    msg: string;

    constructor(
        private postSocket: PostSocketService,
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) { }

    ngOnInit() {


        let result: any = this.parser.parse(this.post);
        if(result) {
            if(result.type == 'video') {
                this.post.message += '<video width="320 height="240" controls><source src="'+result.value.videoUrl+'"></video>';
            
            } else if(result.type == 'picture') {
                this.post.message += '<img src="'+result.value.pictureUrl+'">';
            
            } else if(result.type == 'youtube') {
                this.post.message += '<iframe width="320" height="240" src="'+result.value.videoId+'" frameborder="0" allowfullscreen></iframe>';
            }
        }

        this.msg = this.post.message;

        this.postSocket.onComment(comment => {
            if (this.post.id === comment.post.id) {
                this.post.comments.push(comment)
            }
        })
    }

    /**
     * Send the new post message to the server
     * @param message message to send
     */
    onComment(message: string) {
        this.postService.comment(this.post, message)
            .then(e => console.log(e))
            .catch(e => console.error(e));
    }
}
