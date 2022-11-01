# Okay-POS
> you can find Okay-POS running at https://okay-pos.vercel.app/.</br> **Note the cloud database needs to be migrated to a new host for full functionality.**

Okay-POS is a small front-end project I made up to learn about a few technologies I'm interested in:
- ***Svelte:*** A front-end component-based JS framework used for creating reactive user-interfaces. Unlike virtual-DOM frameworks (like React or Vue), it compiles down to 'vanilla' JS code during the build step. This code updates the DOM when app state changes.
- ***Tailwind CSS:*** So nice, I love it 😊
- ***Graphql:*** A query language for APIs
- ***Hasura:*** Automatically creates a graphql API based on a database schema. Can be run locally, but in this case I used the 'cloud' edition.

*I used [Vercel](https://vercel.com/) to host and build the app straight from this GitHub Repo. They offer such a nice, accessible service to people starting out in web development.*


### ~ A Few Thoughts ~
Svelte proved to be very easy to pick up considering I had little front-end experience. I can understand why it's topping the web framework category on the [Stack Overflow Survey](https://survey.stackoverflow.co/2022/#most-loved-dreaded-and-wanted-webframe-love-dread).

Tailwind also proved to be very easy to pick up. It's quite intuitive and composable. Looking forward to using it again, there are so many other nice features that make professional front end development so accessible.

### ~ Security ~
Hasura offers an easy UI to add/configure public API limits.

- Depth Limits - restricts the depth of Graphql queries (10 max)
- Node Limit - restricted to 3 max
- Rate Limit - restricting Graphql operations per minute, in my case done on an IP address basis (100 max)

I would definitely like to learn how to do this programmatically in the future.

### ~ To Do ~
- [ ] fix some style inconsistencies
- [ ] add more styling
- [ ] implement some type of auth system
- [ ] add a 'previous orders' section
- [ ] Test above security features with Burp Suite 
