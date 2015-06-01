/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        // This test is used to check if the allFeeds object is defined and has content
        it('are defined', function() {
            // Checks if the allFeeds variable has been defined
            expect(allFeeds).toBeDefined();
            // Checks the length of the allFeeds variable to make sure it is not zero
            expect(allFeeds.length).not.toBe(0);
        });


        /* The following test checks if the allFeeds items have a URL
         * defined with content.  This meets the following requirement:
         *      TODO: Write a test that loops through each feed
         *      in the allFeeds object and ensures it has a URL defined
         *      and that the URL is not empty.
         */
        it('have URLs', function() {
            // For loop goes through each item in the allFeeds object
            for (var i=0; i < allFeeds.length; i++) {
                // Checks if the current URL in the object is defined
                expect(allFeeds[i].url).toBeDefined();
                // Checks if the current URL in the object is not empty
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* The following test checks if the allFeeds items have a name
         * defined with content.  This meets the following requirememnt:
         *      TODO: Write a test that loops through each feed
         *      in the allFeeds object and ensures it has a name defined
         *      and that the name is not empty.
         */

        //
        it('have names', function() {
            // For loop goes through each item in the allFeeds object
            for (var i=0; i < allFeeds.length; i++) {
                // Checks if the current name in the object is defined
                expect(allFeeds[i].name).toBeDefined();
                // Checks if the current name in the object is not empty
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* The following group of tests check "the menu" which meets the
     * following requirement:
     *     TODO: Write a new test suite named "The menu"
     */
    describe('The menu', function() {
        /* The following test checks to see if the menu is hidden by default.
         * This test meets the following requirement:
         *      TODO: Write a test that ensures the menu element is
         *      hidden by default. You'll have to analyze the HTML and
         *      the CSS to determine how we're performing the
         *      hiding/showing of the menu element.
         */
        it('menu is hidden by default', function() {
            // Checks if the body element has the menu-hidden class
            // If so, it means the menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* The following test checks to see if the menu unhides and hides
          * when clicked.  This test meets the following requirement:
          *     TODO: Write a test that ensures the menu changes
          *     visibility when the menu icon is clicked. This test
          *     should have two expectations: does the menu display when
          *     clicked and does it hide when clicked again.
          */
        it('menu unhides/hides when clicked', function() {
            // Initiates a click on the menu icon
            $('.menu-icon-link').trigger( "click" );
            // Checks if the body element no longer has the menu-hidden class
            // If it no longer has the class, the menu is visible
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            // Initiates a click on the menu icon
            $('.menu-icon-link').trigger( "click" );
            // Checks if the body element has the menu-hidden class
            // If so, it means the menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* The following group of tests check the "Initial Entries"
     * which meets the following requirement:
     *      TODO: Write a new test suite named "Initial Entries"
     */
    describe('Initial Entries', function() {
        /* The following checks to see if there is a .entry element within the
         * .feed container.  This test meets the following requirement:
         *      TODO: Write a test that ensures when the loadFeed
         *      function is called and completes its work, there is at least
         *      a single .entry element within the .feed container.
         *      Remember, loadFeed() is asynchronous so this test wil require
         *      the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Performs the asynchronous loadFeed function before running the test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // This test checks to see if there is a .entry element within the .feed container
        it('at least a single .entry element within .feed container', function(done) {
            // Checks if the .feed element contains a .entry child element
            // by checking that the .entry element is not a length of zero
            expect($('.feed').has($('.entry')).length).not.toBe(0);
            done();
        });
    });

    /* The following group of tests check "New Feed Selection" which meets the
     * the following requirement:
    /*      TODO: Write a new test suite named "New Feed Selection"
    */
    describe('New Feed Selection', function() {
        /* The following tests check if the Feed Selections change when moving
         * through the allFeeds objects.  These tests meet the following requirement:
         *      TODO: Write a test that ensures when a new feed is loaded
         *      by the loadFeed function that the content actually changes.
         *      Remember, loadFeed() is asynchronous.
         */

        var indexNum = 0;                       // variable used for the loadFeed index
        var previousHtml = '';                  // variable used to hold the previous html

        // Performs the asynchronous loadFeed function before running each test
        // The indexNum is incremented after each test so the next item in the allFeeds
        // object will be loaded to ensure the content changes each time
        beforeEach(function(done) {
            loadFeed(indexNum, function() {
                done();
            });
        });

        // Increments the indexNum after each test is run so the loadFeed function will
        // load the feeds for the next item in the allFeeds object
        afterEach(function(done) {
            indexNum++;
            done();
        });

        // This test checks if the initial feed has a .entry element
        it('initial feed should have at least a single .entry element', function(done) {
            // Checks if the .feed element contains a .entry child element
            // by checking that the .entry element is not a length of zero
            expect($('.feed').has($('.entry')).length).not.toBe(0);
            // Sets the previousHtml variable to contain the .entry element html for the next test
            previousHtml = $('.entry').html();
            done();
        });

        // For loop cycles through the allFeeds items to check change in .entry content
        for (var i=1; i < allFeeds.length; i++){
            var feedNum = i + 1;                // Sets a variable to indicate the current feed item
                                                // in the test description
            // This test checks if the .entry element changes from the previous .entry element
            it('feed ' + feedNum + ' first .entry is different than feed '+ i + ' first .entry', function(done) {
                // Checks if the .feed element contains a .entry child element
                // by checking that the .entry element is not a length of zero
                expect($('.feed').has($('.entry')).length).not.toBe(0);
                // Checks that the current .entry element html is not equal to the previous
                // .entry element html.  This shows that the content has actually changed.
                expect($('.entry').html()).not.toBe(previousHtml);
                // Sets the previousHtml variable to contain the .entry element html for the next test
                previousHtml = $('.entry').html();
                done();
            });
        }
    });
}());