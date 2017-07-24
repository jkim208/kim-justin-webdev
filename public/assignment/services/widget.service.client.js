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
            findAllWidgetsForPage: findAllWidgetsForPage,
            reorderWidgets: reorderWidgets,
            updateFlickr: updateFlickr
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

        function createWidget(pageId, widget) {
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.post(url,widget)
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

        function reorderWidgets(pageId,index1,index2) {
            var url = '/api/assignment/page/' + pageId + '/widget?initial=' + index1 + '&final=' + index2;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateFlickr(pageId,widgetId,urlObject) {
            var url = '/api/assignment/flickr/' + pageId + '/' +widgetId;
            return $http.put(url,urlObject)
                .then(function (response) {
                    return response.data;
                })
        }
    }
}) ();