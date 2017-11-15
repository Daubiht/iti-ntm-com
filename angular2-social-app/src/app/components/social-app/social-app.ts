import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';
import { ActivatedRoute, Router } from '@angular/router';
import { PostSocketService } from 'app/services/PostSocketService';

/**
 * Main component. Display the channel list, the social feed and the notification bar for logged users.
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];

    constructor(
        private channelService: ChannelService,
        private route: ActivatedRoute,
        private postSocketService: PostSocketService,
        private router: Router
    ) {
    }

    async ngOnInit() {
        // get the channels with the channelService
        this.channelService.getAll()
            .then((response) => {
                this.channels = this.channels.concat(response);

                if (!this.route.firstChild && this.channels.length > 0) {
                    this.router.navigateByUrl('/channel/' + this.channels[0].id)
                }
            })
            .catch(error => console.error(error));


        this.postSocketService.onNewChannel(channel => this.channels.unshift(channel));
    }
}
