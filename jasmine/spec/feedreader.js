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
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });


        // Make sure all feeds have URL that starts with "http(s)://"
        it("have URLs", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have names", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe("string");
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* test suite named "The menu" */

    describe("The menu", function() {

        // Pre-define elements needed for testing hiding/showing of the menu
        var body = document.body;
        var menuIcon = document.querySelector(".menu-icon-link");

        // the menu is hidden initially
        it("body has 'menu-hidden' initially", function() {
            expect(body.className).toContain("menu-hidden");
        });

        // menu icon toggles hide/show on clicking
        it("body toggles the class 'menu-hidden' on clicking menu icon", function() {
            menuIcon.click();
            expect(body.className).not.toContain("menu-hidden");

            menuIcon.click();
            expect(body.className).toContain("menu-hidden");
        });
    });


    /* test suite named "Initial Entries" */

    describe("Initial Entries", function() {

        // Avoid duplicated setup
        // Before loading feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Tnew test suite named "New Feed Selection" */
        it("has at least 1 entry after loadFeed function is called", function(done) {
            var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });

        // each (.feed .entry-link) element has valid link
        it("has a entry that has a link starting with 'http(s)://'", function(done) {
            var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
            for (var i = 0; i < entries.length; i++) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });
    });

}());