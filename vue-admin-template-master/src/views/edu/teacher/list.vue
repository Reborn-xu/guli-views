<template>
    <div class="app-container">
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
        </el-form-item>

        <el-form-item>
            <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
            <el-option :value="1" label="高级讲师"/>
            <el-option :value="2" label="首席讲师"/>
            </el-select>
        </el-form-item>

        <el-form-item label="添加时间">
            <el-date-picker
            v-model="teacherQuery.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>
        <el-form-item>
            <el-date-picker
            v-model="teacherQuery.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
        <!-- 表格 -->
        <el-table
        
        :data="list"
        
        border
        fit
        highlight-current-row>

            <el-table-column
                label="序号"
                width="70"
                align="center">
                <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="name" label="名称" width="80" />

            <el-table-column label="头衔" width="80">
                <template slot-scope="scope">
                    <!-- js的===表示判断值和类型是否一致 -->
                {{ scope.row.level===1?'高级讲师':'首席讲师' }}
                </template>
            </el-table-column>

            <el-table-column prop="intro" label="资历" />

            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

            <el-table-column prop="sort" label="排序" width="60" />

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/teacher/save/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit" >修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :current-page="page"
            :page-size="limit"
            :total="total"
            layout="total, prev, pager, next, jumper"
            style="padding: 30px 0; text-align: center;"
            v-on:current-change="getList">
            
        </el-pagination>    
    </div>
</template>


<script>
import teacher from '@/api/teacher/teacher';
export default {
    //核心代码
    data(){
        return{
            list:null,//返回的数据
            page:1,
            limit:5,
            total:0,
            teacherQuery:{}//条件封装对象
        }
    },
    created(){//页面渲染前执行，一般调用methods的方法
        this.getList();
    },
    methods:{
        //讲师列表
        //page = 1表示，不传参page默认为1，传参则为传参的值
        getList(page = 1){
            this.page = page;
            teacher.getPageTeacherCondition(this.page,this.limit,this.teacherQuery)
                .then(response => {
                    console.log(response);
                    this.list = response.data.rows;
                    this.total = response.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            
        },
        resetData(){
            //清空查询数据
            this.teacherQuery={};
            //重新加载表格
            this.getList();
        },
        removeDataById(id){
            alert(id);
            this.$confirm('此操作将删除该讲师, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                teacher.deleteTeacherId(id)
                    .then(response => {                       
                        //提示
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });                      
                        //重新加载表格
                        this.getList();
                    })                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '服务器出错'
                    });          
            });
        }
    }
}
</script>