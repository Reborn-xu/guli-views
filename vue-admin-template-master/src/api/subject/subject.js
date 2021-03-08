import request from '@/utils/request'

export default {

  //1、讲师列表（条件查询分页）
  //current当前页 limit每页记录数 teacherQuery条件对象
  //``里的参数可以用${id}来传参
  getSubjectList() {
    return request({
      url: `/eduservice/edu-subject/getAllSubject`,
      method: 'get',
      
    })
  },
  
}

