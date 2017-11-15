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

    constructor(
        private postSocket: PostSocketService,
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) { }

    ngOnInit() {
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
