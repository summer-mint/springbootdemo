var dataTable = null;
$(function() {
	dataTable = $('#dataTable').DataTable({
		"searching": false,
		"bStateSave": true, //状态保存，使用了翻页或者改变了每页显示数据数量，会保存在cookie中，下回访问时会显示上一次关闭页面时的内容。
		"processing": true,
		"serverSide": true,
		"bLengthChange": false,
		"bSort": false, //关闭排序功能
		"pagingType": "bootstrap_full_number",
		"ajax":  { 
			url:'/web/adminUser/adminUserListData',
			"dataSrc": function(json) {
				console.log(json);
				if (json.code == 200) {
					return json.data;
				}
				return [];
			},
			"data": function(data) {
				//高级查询参数
				data.realName = $("#realName").val();
				data.mobile = $("#mobile").val();
			}
		},
		"columns": [
			{ "data": "realName"},
			{ "data": "mobile"},
			{ "data": "parentName"},
			{ "data": "commission"},
			{ "data": "createTime"},
			{ "data": "roleName"},
			{ "data": "status"}
		],
		"columnDefs": [
			{
	            "render": function(data, type, row) {
	                //return "<a href="/web/adminUser/adminUserEdit?id=" + row.id + ">" + data + "</a>";
	            },
	            "targets": 0
	        },
			{
	        	"render":function(data, type, row) {
	        		var str = "";
	        		if(row.status==0){
	            		str = "<a href='javascript:updateRow("+ row.id + ",1);' class='btn btn-danger btn-sm'>冻结 </a>";
	            	}else{
	            		str = "<a href='javascript:updateRow("+ row.id + ",0);' class='btn btn-danger btn-sm'>解冻 </a>";
	            	}
	        		return str;
	        		//"<a href="+getRootPath()+"/web/adminUser/adminUserEdit?id=" + row.id + " class='btn blue btn-sm'>查看详情/编辑</a>";
	        	},
	        	"targets":7
			}
		]
	});

	$("#search").click(function(){
		dataTable.ajax.reload();

		return false;
	});

	$("#addButton").click(function() {
		window.location.href ="/web/adminUser/adminUserEdit";
	});
});