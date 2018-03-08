package springbootdemo.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import springbootdemo.com.Entity.User;
import springbootdemo.com.controller.pojo.BaseResponse;
import springbootdemo.com.dao.Userdao;

@RestController
public class UserController {
	
	
	@Autowired
	Userdao userdao;
	
	
	/*
	 * 查询所有用户 
	 */
	@RequestMapping(value={"/getuser"}, method=RequestMethod.GET)
	@ApiOperation(value="获取用户列表", notes="")
		public BaseResponse<List<User>> show(){
		BaseResponse<List<User>> response = new BaseResponse<List<User>>() ;
		try{
			response.setMessage("查询成功");
			response.setResponseStatus(1);
			response.setData(userdao.findAll());
		}catch(Exception ex){	
			response.setMessage("查询失败"+ex.getMessage());
			response.setResponseStatus(0);
		}
		return response;
	}
	
	/*
	 * 登录
	 */
	 @RequestMapping(value="/login", method=RequestMethod.POST)
	 @ApiOperation(value="登录", notes="")
	 	public BaseResponse<User> login(String username ,String password){
			BaseResponse<User> response = new BaseResponse<User>() ;
			boolean flag = userdao.findByUsername(username).get(0)==null?false:true;
			if (!flag){
				response.setMessage("查无此用户");
				response.setResponseStatus(1);
				return response;
				}
			
			User user = userdao.withusernameAnpasswordQuery(username, password);
			try{
				
			if(user!=null){
				response.setMessage("登录成功");
				response.setResponseStatus(1);
				response.setData(user);
				return response;}
			else {
				response.setMessage("登录失败密码错误");
				response.setResponseStatus(1);
				return response;
			}
			}catch(Exception ex){	
				response.setMessage("服务器内部错误"+ex.getMessage());
				response.setResponseStatus(0);
			}
			return response;
		}
	
	/*
	 * 删除用户
	 */
		@RequestMapping(value={"/deleteuser"}, method=RequestMethod.DELETE)
		@ApiOperation(value="删除用户", notes="")
		public BaseResponse delete(int id){
			BaseResponse response = new BaseResponse();
			try{
				userdao.delete(id);			
				response.setMessage("删除成功");
				response.setResponseStatus(1);
			
			}catch(Exception ex){	
				response.setMessage("删除失败"+ex.getMessage());
				response.setResponseStatus(0);
			}
			return response;
		}
	
	/*
     * 修改用户
	 */
		@RequestMapping(value={"/updateuser"}, method=RequestMethod.POST)
		@ApiOperation(value="修改用户", notes="")
		public BaseResponse<User> update (User user){


			BaseResponse<User> response = new BaseResponse<User>();
			
			if(user.getId()== null || user.getId()==0){
				response.setMessage("用户ID不能为空");
				response.setResponseStatus(1);
				return response;
			}
			
			if(user.getUsername() == null || user.getUsername() == ""){
				response.setMessage("用户名不能为空");
				response.setResponseStatus(1);
				return response;
			}
			if(user.getPassword() == null || user.getPassword() == ""){
				response.setMessage("用户密码不能为空");
				response.setResponseStatus(1);
				return response;
			}
			User olduser = userdao.findById(user.getId());
			boolean flag = olduser==null?false:true;
			if (!flag){
				response.setMessage("查无此用户");
				response.setResponseStatus(1);
				return response;
				}
			
			boolean flag1  =  userdao.findByUsername(user.getUsername()).size()>=1?false:true;
			if(!flag1&&!(olduser.getUsername().equals(user.getUsername()))){
				response.setMessage("用户名称相同修改失败");
				response.setResponseStatus(1);
				return response;
			}
			
			
			try{
				response.setData(userdao.save(user));			
				response.setMessage("修改成功");
				response.setResponseStatus(1);
			
			}catch(Exception ex){	
				response.setMessage("修改失败"+ex.getMessage());
				response.setResponseStatus(0);
			}
			return response;
		}
	
	/*
	 * 修改用户
	 */
		@RequestMapping(value={"/saveuser"}, method=RequestMethod.POST)
		@ApiOperation(value="新增用户", notes="")
		public BaseResponse<User> save(String username ,String password){
			BaseResponse<User> response = new BaseResponse<User>();
			if(username== null || username == ""){
				response.setMessage("用户名不能为空");
				response.setResponseStatus(1);
				return response;
			}
			if(password == null || password == ""){
				response.setMessage("用户密码不能为空");
				response.setResponseStatus(1);
				return response;
			}
			boolean flag  =  userdao.findByUsername(username).size()>=1?false:true;
			if(!flag){
				response.setMessage("用户名称相同新增失败");
				response.setResponseStatus(1);
				return response;
			}
			try{
				User user = new User();
				user.setPassword(password);
				user.setUsername(username);
				response.setData(userdao.save(user));			
				response.setMessage("新增成功");
				response.setResponseStatus(1);
			
			}catch(Exception ex){	
				response.setMessage("新增失败"+ex.getMessage());
				response.setResponseStatus(0);
			}
			return response;
			
		}
}
