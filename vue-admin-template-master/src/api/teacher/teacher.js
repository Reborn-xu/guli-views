import request from '@/utils/request'

export default {

  //1、讲师列表（条件查询分页）
  //current当前页 limit每页记录数 teacherQuery条件对象
  getPageTeacherCondition(current,limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //data默认穿的json数据，后端用@Responsebody接收
      data: teacherQuery
    })
  },
  deleteTeacherId(id){
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  //添加讲师
  addTeacher(teacher){
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  updateTeacher(teacher){
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getInfoById(id){
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  }
}

