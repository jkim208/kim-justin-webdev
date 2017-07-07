(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var api = {
            findWidgetById: findWidgetById,  //profile: get widget info from id number
            createWidget: createWidget, //adds widget parameter instance to widgets array
            updateWidget: updateWidget, //updates widget in array whose _id matches widgetID
            deleteWidget: deleteWidget, //removes widget whose _id matches widgetId
            findAllWidgetsForPage: findAllWidgetsForPage, //
            selectPhoto: selectPhoto
        };
        return api;

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWidget(widget) {
            var url = "/api/assignment/page/" + widget.pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function selectPhoto(websiteId, pageId, widgetId, ImageUrl) {
            var url = "/api/assignment/widget/" + widgetId;
            console.log(url);
            return $http.put(url, pageId, widgetId, ImageUrl)
                .then(function (response) {
                    return response.data;
                });
        }

    }
}) ();