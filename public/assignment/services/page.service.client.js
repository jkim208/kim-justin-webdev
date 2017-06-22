(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            findPageById: findPageById,  //profile: get page info from id number
            createPage: createPage, //adds page parameter instance to pages array
            updatePage: updatePage, //updates page in array whose _id matches pageID
            deletePage: deletePage, //removes page whose _id matches pageId
            findAllPagesForUser: findAllPagesForUser //
        };
        return api;

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function updatePage(pageId, page) {

        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

        function findAllPagesForUser(websiteId) {
            var resultSet = [];
            for(var w in pages) {
                if(pages[w].websiteId === websiteId) {
                    resultSet.push(pages[w]);
                }
            }
            return resultSet;
        }

    }
}) ();