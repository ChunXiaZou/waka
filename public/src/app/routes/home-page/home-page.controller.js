(function(angular) {
    'use strict';

    angular.module('waka').controller('homeController', ['$scope','$state', 'User',
        'Answer', 'Topic', 'iCookie', homeController]);

    function homeController($scope, $state, User, Answer, Topic, iCookie) {
        var vm = this;

        vm.allTopics = '';
        vm.followingTopic = '';
        vm.answerList = '';
        vm.answerListLeft = [];
        vm.answerListRight =[];

        getAnswers();

        function getAnswers() {
            getUserFollowingTopic(function(topicIdList) {
                var params = {
                    topicList: topicIdList
                };
                Answer.getByUserTopics(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log(res);
                        vm.answerList = res.data;
                        res.data.forEach(function(item, index) {
                            if (index%2 ===0)
                                vm.answerListRight.push(item);
                            else
                                vm.answerListLeft.push(item);
                        });
                    });
            });
        }

        function getUserFollowingTopic(callback) {
            if (vm.followingTopicIdList) {
                callback(vm.followingTopicIdList);
                return;
            }

            User.getFollowingTopicAll({_id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    var user = res.data.user;
                    if ( res.data.topics.length > 0 ) {

                        var topicIdList = res.data.topics.map(function(item) {
                            return item._id;
                        });

                        vm.followingTopicIdList = topicIdList;

                        callback(topicIdList);
                    } else {  // user is not following any topics

                        getAllTopic(function(topics) {
                            var topicIdList = topics.map(function(item) {
                                return item._id;
                            });

                            callback(topicIdList);
                        });

                    }
                })
        }

        function getAllTopic(callback) {
            if (vm.allTopics) callback(vm.allTopics);
            else {
                Topic.list().$promise.then(function(res) {
                    vm.allTopics = res.data;
                    callback(res.data);
                });
            }
        }
    }
})(angular);
