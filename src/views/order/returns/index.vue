<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="退货单号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.returns_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="用户账号">
        <template slot-scope="scope">
          <span>{{ scope.row.users_email }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="退款原因">
        <template slot-scope="{row}">
          <span>{{ row.returns_reason }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleDelete(scope.row)"
          >完成退款</el-button>
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
  </div>
</template>

<script>
import { returnsList, deleteReturns } from "@/api/returns";
import { getUsers } from "@/api/user";
import { getOrder, deleteOrder } from "@/api/order";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { constants } from "crypto";

export default {
  name: "ArticleList",
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      returnsList().then(response => {
        this.list = response.data;
        this.total = response.data.length;
        this.listLoading = false;
        this.list.forEach(element => {
          getOrder({
            id: element.order_id
          }).then(res => {
            getUsers(res.data.users_id).then(res => {
              this.list.forEach(element => {
                this.$set(element, "users_email", res.data.users_email);
              });
            });
          });
        });
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteReturns({
            id: row.id
          }).then(res => {
            deleteOrder({
              id: row.order_id
            }).then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "退货完成!"
              });
              this.getList();
            });
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
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
