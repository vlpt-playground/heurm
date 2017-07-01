// 페이스북 및 구글 SDK 로딩
const FB = require('fb');
const google = require('googleapis');

// 구글 SDK 인스턴스 생성
const plus = google.plus('v1');

/*
    Reference: 
    - https://developers.facebook.com/docs/javascript/reference/FB.api
    - https://developers.facebook.com/docs/graph-api/reference/v2.2/user
*/
exports.facebook = {
    getProfile: (accessToken) => {
        return FB.api('me', { fields: ['email', 'picture'], access_token: accessToken }).then(
            (auth) => {
                /* 샘플 응답
                    { email: 'jn4kim@live.co.kr',
                    picture:
                    { data:
                        { is_silhouette: true,
                            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=726660dce6ba9660584686ee99a62deb&oe=59D7152F' } },
                    id: '1125967800838058' }
                */
                return {
                    id: auth.id,
                    email: auth.email,
                    thumbnail: auth.picture.data.url
                };
            }
        );
    }
};

/*
    Reference: 
    - https://developers.google.com/+/web/api/rest/latest/people/get
    - https://www.npmjs.com/package/googleapis
*/

exports.google = {
    getProfile: (accessToken) => {
        return new Promise((resolve, reject) => {
            plus.people.get({
                userId: 'me',
                access_token: accessToken
            }, (err, auth) => {
                /* 샘플 응답
                    { kind: 'plus#person',
                    etag: '"Sh4n9u6EtD24TM0RmWv7jTXojqc/Fu2Zu0EFbe6R-vZ54cLsRcv5pak"',
                    nickname: 'jn4kim',
                    emails: [ { value: 'jn4kim@gmail.com', type: 'account' } ],
                    objectType: 'person',
                    id: '108009357836255815525',
                    displayName: '김민준 (jn4kim)',
                    name: { familyName: '김', givenName: '민준' },
                    url: 'https://plus.google.com/108009357836255815525',
                    image:
                    { url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',
                        isDefault: true },
                    isPlusUser: true,
                    language: 'ko',
                    circledByCount: 1,
                    verified: false }
                */
                if(err) reject(err);
                resolve({
                    id: auth.id,
                    email: auth.emails[0].value,
                    thumbnail: auth.image.url
                });
            });
        });
    }
};