(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, $routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {"url": url};
            widget._id = model.widgetId;
            widget.pageId = model.pageId;
            widget.widgetType = "IMAGE";
            widget.width = "100%";
            widgetService
                .updateWidget(widget._id, widget)
                .then(function(widget) {
                    $location.url
                    ('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();