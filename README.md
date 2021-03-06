# iamplayer (beta)

An unofficial Apple Music web player built with Angular, NgRx and Bootstrap using the official Apple Music API and MusicKit JS to connect to Apple Music catalog and iCloud music library. Inspired by [Musi.sh](https://musi.sh/) and [@naveedgol's player](https://github.com/naveedgol/music-web-player).

The app is no longer maintained and live version will be available for some time for demo purposes.

### To run the app:
- clone the repo
- replace `TOKEN` in `api-service.service.ts` with your Apple developer token string, see [Getting keys and creating tokens](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens) for details on how to generate tokens
- run `npm install` and `ng serve`

## What I used

- Icons by [Feather Icons](https://feathericons.com) and [Angular Feather](https://github.com/michaelbazos/angular-feather) by @michaelbazos
- [Bootstrap](https://getbootstrap.com) + [Ng-Bootstrap](https://ng-bootstrap.github.io/#/home) and [Ngx-Bootstrap](https://valor-software.com/ngx-bootstrap/#/)
- Node app for generating Apple music tokens by @sheminusminus [https://github.com/sheminusminus/apple-music-token-node]
- Hosting on [Netlify](https://netlify.com)

## Screenshots

![For you](https://imgur.com/l1LuRLM.png)
![Browse - dark mode](https://imgur.com/Nfyg7PJ.png)
![Album view](https://i.imgur.com/rhzzOq0.png)
![Playlist view - dark mode](https://i.imgur.com/od7eD3C.png)
![Mobile](https://i.imgur.com/shkU5oK.png)

