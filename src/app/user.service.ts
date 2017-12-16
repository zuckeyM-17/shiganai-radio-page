import { Injectable } from '@angular/core';
import SC from 'soundcloud';

import { User } from './user';

@Injectable()
export class UserService {

  constructor() { }

  getUserData(): Promise<User> {
    SC.initialize({
      client_id: 'nviGqqUJ1aoaFVSMA7EdLE3IZJLwYFKU',
      redirect_uri: 'http://example.com/callback'
    });
    return SC.get('/users/294673416')
      .then(res => {
        return {
          trackCount: res.track_count,
          uri: res.uri,
        };
      }).catch(err => console.log(err));
  }
}
