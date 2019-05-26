<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleUpdate()"
      >
        <strong>添加用户(模拟前台注册用户)</strong>
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="注册日期">
        <template slot-scope="scope">
          <span>{{ scope.row.users_resTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="用户账号">
        <template slot-scope="scope">
          <span>{{ scope.row.users_email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.users_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货地址">
        <template slot-scope="{row}">
          <span>{{ row.users_address }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="消费总额">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.users_consumption }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="账号" prop="users_email">
          <el-input v-model="temp.users_email"/>
        </el-form-item>
        <el-form-item label="电话" prop="users_phone">
          <el-input v-model="temp.users_phone"/>
        </el-form-item>
        <el-form-item label="收货地址" prop="users_address">
          <el-input
            v-model="temp.users_address"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { usersList, createUsers, updateUsers, deleteUsers } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import { constants } from "fs";
export default {
  name: "ArticleList",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      temp: {
        users_phone: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        users_resTime: [
          {
            type: "date",
            required: true,
            message: "users_resTime is required",
            trigger: "change"
          }
        ],
        users_email: [
          { required: true, message: "title is required", trigger: "blur" }
        ],
        users_phone: [
          {
            required: true,
            message: "users_phone is required",
            trigger: "blur"
          }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      usersList().then(response => {
        this.list = response.data;
        this.total = response.data.length;
        this.listLoading = false;
        console.log(this.list);
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let vm = this;
          let temp = Object.assign({}, row); // copy obj

          deleteUsers({ id: temp.id }).then(response => {
            vm.$message({
              type: "success",
              message: "删除成功!"
            });
            vm.getList();
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);

          if (tempData.id) {
            updateUsers({
              id: tempData.id,
              users_email: tempData.users_email,
              users_phone: tempData.users_phone,
              users_address: tempData.users_address
            }).then(response => {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success"
              });
              this.getList();
            });
          } else {
            console.log(tempData);
            createUsers({
              users_email: tempData.users_email,
              users_phone: tempData.users_phone,
              users_address: tempData.users_address
            }).then(response => {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success"
              });
              this.getList();
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
