import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';



const youtube = "https://youtu.be/";

/**
 * Parse post content
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);

        if (pictureMatche) {
            return new PicturePostContent(pictureMatche[0]);
            // return picture content
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const youtubeMatche = youtubeRegex.exec(post.message);
        // return YoutubeContent if match
        if (youtubeMatche) {
            return new YoutubePostContent(youtubeMatche[0]);
            // return picture content
        }


        const videoRegex = /http[s]?:\/\/.+\.(avi|mp4|mkv|wmv)/gmi; // TODO
        // return VideoContent if match
        const videoMatche = videoRegex.exec(post.message);
        // return YoutubeContent if match
        if (videoMatche) {
            return new VideoPostContent(videoMatche[0]);
            // return picture content
        }


        return null;
    }
}
