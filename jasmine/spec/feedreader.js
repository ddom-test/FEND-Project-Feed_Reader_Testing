/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. It is important
 * to ensure that they don't run until the DOM is ready.
 */
$(function() {
    /* First test suite. This is all about the RSS
    * feeds definitions, the allFeeds variable.
    */
    describe('RSS Feeds', function() {
        /* First test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('URLs are defined and not empty', function () {

           allFeeds.forEach(function (el) {

             expect(el.url).toBeDefined();
             expect(el.url).not.toBe('');
           });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('names are defined and not empty', function () {

           allFeeds.forEach(function (el) {

             expect(el.name).toBeDefined();
             expect(el.name).not.toBe('');
           });
         });
    });


    /* Test suite named "The menu" */

        /* The first test ensures that the menu element is
         * hidden by default.
         */

         /* The second test ensures that the menu changes
          * visibility when the menu icon is clicked.
          */

    describe('The menu', function() {

      // Ensures that the menu element is hidden by default
      it('element is hidden by default', function() {

          let body = document.querySelector('body');


          // Documentation:
          // toContain(expected)
          // 'expect' the actual value to contain a specific value.

          // For instance:
          // expect(array).toContain(anElement);
          // expect(string).toContain(substring);

          expect(body.className).toContain('menu-hidden');
      });

      // Ensures that the menu changes visibility when the menu icon is clicked
      // and does it hide when clicked again
      it('changes visibility when the menu icon is clicked and does it hide when clicked again', function() {

        const menuIcon = document.querySelector('i.icon-list');
        const body = document.querySelector('body');

        menuIcon.click();
        expect(body.className).not.toContain('menu-hidden');

        menuIcon.click();
        expect(body.className).toContain('menu-hidden');
      });
    });


    /* Test suite named "Initial Entries" */

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Note: loadFeed() is asynchronous.
         */

    describe('Initial Entries', function() {

      beforeEach (function (done) {

        // Waiting for 'done' function to run before continuing
        // with tests -> waiting for asynchronous code to be executed
        loadFeed(0, done);
      });

      // Ensures that when the LoadFeed function is called and completed its work,
      // there is at least a single .entry element within the .feed container
      it('the LoadFeed function was called and completed its work. The .feed container is not empty', function () {

        const feedContainer = document.querySelector('.feed');
        expect(feedContainer.childNodes.length).toBeGreaterThan(0);
      });
    });


    /* Test suite named "New Feed Selection" */

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         * Note: loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function() {

      let contentAfter;
      let contentBefore;

      beforeEach (function (done) {

        loadFeed(0, function () {

          contentBefore = document.querySelector('.feed').innerText;

          loadFeed(1, function () {

            contentAfter = document.querySelector('.feed').innerText;
            done();
          });   // 'loadFeed(1, ...)'

        });   // 'loadFeed(0, ...)'
      });

      // Ensures that when a new feed is loaded by the LoadFeed function
      // the content actually changes
      it('when a new feed is loaded the content actually changes', function () {

        // Just for debug!
        // console.log("Before: \n\n", contentBefore, "\n\n", "After: \n\n", contentAfter);

        expect(contentBefore).not.toBe(contentAfter);
      });
    });

}());
