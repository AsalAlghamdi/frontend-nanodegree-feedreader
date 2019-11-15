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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('there is no empty URL for each feeds ', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });
        
        it('there is no empty name for each feeds ', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });
    
    describe('The menu', function () {
        const body = document.querySelector('body');
        const menuIcon = document.querySelector('.menu-icon-link');
        it('hiding/showing menu work correctly', function () {
            expect(body.classList).toContain('menu-hidden');
        });
        it('menu button change the visibility of the menu when it is clicked', function (){
            $(".menu-icon-link").click();
            expect(body.classList).not.toContain('menu-hidden');
            $(".menu-icon-link").click();
            expect(body.classList).toContain('menu-hidden');
        });
    });
    
    describe('Initial Entries', function(){
        const feed = document.querySelector('.feed');
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('loadFeed() is called and completes its work',function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    });
        

    describe('New Feed Selection',function(){
        let oldFeed = '', 
            newFeed = '';
        beforeEach(function (done){
            loadFeed(0, function(){
                oldFeed = $('.feed').html();
                loadFeed(1, function () {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('content actually changes after loadFeed() called',function(){            
            expect(newFeed).not.toBe(oldFeed);
        });
    });
        
}());
