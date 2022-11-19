# Twitter Crawler for Mastodon handles

This handy JavaScript script scans your follower lists on Twitter for Mastodon handles.

No access granting of foreign sites is neccessary.
No private information leaves your browser.

## How to use

1. Log into Twitter in Chrome.
2. Navigate to your follower list.
3. Open the JavaScript console (F12)
4. Copy the contents of mastodon-handle-crawler.js into the console.
5. Run by hitting enter.

The script will start scanning for Mastodon handles in the bios and the Twitter name.

Scroll down to load the chunk of followers.
The script will automatically fill the result list, the yellow box on the left.

To automate scrolling execute `startScrolling()` in the console.
To stop scrolling, execute `stopScrolling()`.

While scanning, URLs will be formated to conform @name@host format.

The script produces a csv list of handles, ready to copy and past into a empty csv-file.
You can import this csv file into your Mastodon account.
