/**
 * Created by hwen on 15/12/22.
 */

(function(angular) {
    angular.module('waka')

        .constant('STATUS', {
            'SUCCESS': 0, //�ɹ�
            'FAILED': 1,  //ʧ��
            'NOLOGIN': 2, //δ��¼
            'ILLEGAL': 3, //���Ϸ�����
            'NOTFOUND': 4, //δ�ҵ�
            'NOEXIST': 5, //�û�������
            'EXCEPTION': 100 //�����쳣
        });
})(angular);