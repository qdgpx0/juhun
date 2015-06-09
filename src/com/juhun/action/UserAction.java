/**
 * 
 */
package com.juhun.action;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;
import com.juhun.entity.Admin;
import com.juhun.entity.Users;
import com.juhun.service.UserService;
import com.juhun.util.Page;
import com.opensymphony.xwork2.ActionSupport;

/** * @author  宋超: 
 * @date 创建时间：2015年5月31日 下午4:43:54
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class UserAction extends ActionSupport implements RequestAware,
		SessionAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3420720322918786892L;
	private Map<String, Object> request;
	private Map<String, Object> session;
	private String id;//唯一标识符
	private String username;//用户名
	private String password;//密码
	private String relname;//真实姓名
	private Date usertime;//用户创建时间
	private String userphone;//用户电话
	private String address;//地址
	private String isadmin;
	private String message;
	private String ausername;
	private String adminpassword;
	private String adminname;
	private String adminqx;
	private int pagenum;
	private String keyword;
	private UserService userService = new UserService();
	
	public String Tologin(){
		if("admin".equals(this.isadmin)){
			Admin admin = userService.checkloginadmin(username, password);
			if(admin != null){
				this.message = "success";
				session.put("admin", admin);
				if(admin.getAdminqx().equals("boss")){
				session.put("quanxian", "boss");
				}else {
				session.put("quanxian", "putong");	
				}
			}else {
				this.message = "error";
			}
		}else{
			Users users = userService.checkloginguke(username, password);
			if(users!=null){
				this.message = "success";
				session.put("users", users);
			}else {
				this.message = "error";
			}
		}
		return SUCCESS;
	}
	
	
	/**
	 * 	* @author  宋超: 
		* @date 创建时间：2015年5月17日 下午1:40:29
		* @version 1.0 
		* @parameter   用户退出
		* @since 
	 	* @return
	 */
		public String decUsername(){
			if(session.get("admin") != null){
			session.remove("admin");
			session.remove("quanxian");
			}
			if(session.get("users") != null){
			session.remove("users");
			}
			return SUCCESS;
		}
	
		//验证用户名是否重复方法
		public String CheckUsername(){
		boolean flag = userService.CheckUsername(username);
		if(flag){
			this.message = "success";
		}else {
			this.message = "error";
		}
		return SUCCESS;
		}
		
		//注册用户
		public String registerAddUser(){
			Users users = new Users();
			users.setUsername(username);
			users.setPassword(password);
			users.setRelname(relname);
			users.setUserphone(userphone);
			users.setAddress(address);
			users.setUsertime(new Date());
			boolean flag = userService.AddGuke(users);
			if(flag){
				this.message = "success";
				session.put("users", users);
			}else {
				this.message = "error";
			}
			return SUCCESS;
		}
	
		/**
		 * * @author  宋超: 
			* @date 创建时间：2015年5月31日 上午11:41:06
			* @version 1.0 
			* @parameter  通过条件查询订单
			* @since 
		 	* @return
		 */
		public String searchAdminAll() throws UnsupportedEncodingException{
			int num = 0;
			if(pagenum==0 || ("").equals(pagenum)){
			num = 0 ;
			}else{
				num = pagenum - 1;
			}
			int pagesi = 10;
			HashMap<String, String> search = new HashMap<String, String>();
			if(keyword != null){
				keyword = new String(keyword.getBytes("ISO-8859-1"),"utf-8");
				search.put("keyword", keyword);
			}else {
				search.put("keyword", "");
			}
			if(adminqx != null){
				search.put("adminqx", adminqx);
			}else {
				search.put("adminqx", "");
			}
			Page page = userService.SelectWowUser(search, num*pagesi, pagesi);
			if(page != null ){
	        request.put("page", page);
	        request.put("selectmess", "success");
			}else{
			request.put("selectmess", "wu");	
			}
	        return SUCCESS;
		}
		
		
		public String updateadmin(){
			boolean bool = userService.checkadminname(ausername);
			if(bool){
				this.message = "chongfu";
				return SUCCESS;
			}
			boolean flag = true;
				Admin admin = new Admin();
				admin.setAusername(ausername);
				admin.setAdminpassword(adminpassword);
				admin.setAdminname(adminname);
				if("admin".equals(ausername)){
				admin.setAdminqx("boss");
				}else {
					admin.setAdminqx("putong");
				}
				if(id != null && !"".equals(id)){
				admin.setId(id);
				 flag = userService.UpdateAdmin(admin);
				}else{
				 flag =	userService.SaveAdmin(admin);
				}
			if(flag){
				this.message = "success";
			}else{
				this.message = "error";
			}
			return SUCCESS;
		}
	
		public String deleteadmin(){
			boolean flag = userService.DeleteAdmin(id);
			if(flag){
				this.message = "success";
			}else{
				this.message = "error";
			}
			return SUCCESS;
		}
		
		//批量删除admin
	    public String DeleteAdmins(){
	        //String ids = this.ids;
	        String[] ids = this.id.split(",");
	        try {
	            for (int i = 0; i < ids.length; i++) {
	                String keid = ids[i];
	                userService.DeleteAdmin(keid);
	            }
	            this.message = "success";
	        } catch (NumberFormatException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            this.message = "error";
	        }
	        return SUCCESS;
	    }
	    
		/**
		 * * @author  宋超: 
			* @date 创建时间：2015年5月17日 下午1:55:03
			* @version 1.0 
			* @parameter  修改个人信息
			* @since 
		 	* @return
		 */
		public String UpdateUsers(){
			Users users = (Users)session.get("users");
			if(password != null){
			users.setPassword(password);
			}else{
			users.setRelname(relname);
			users.setUserphone(userphone);
			users.setAddress(address);
			}
			boolean flag = userService.UpdateGuke(users);
			if(flag){
				this.message = "success";
				session.remove("users");
				session.put("users",users);
			}else{
				this.message = "error";
			}
			return SUCCESS;
		}
		/**
		 * * @author  宋超: 
			* @date 创建时间：2015年5月17日 下午2:24:55
			* @version 1.0 
			* @parameter  检验旧密码是否正确
			* @since 
		 	* @return
		 */
		public String checkPassword(){
			Users users = (Users)session.get("users");
			boolean flag = password.equals(users.getPassword());
			if(flag){
				this.message = "success";
			}else {
				this.message = "error";
			}
			return SUCCESS;
		}
	    
	/* (non-Javadoc)
	 * @see org.apache.struts2.interceptor.SessionAware#setSession(java.util.Map)
	 */	
	
	@Override
	public void setSession(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.session =arg0;
	}
	//get set	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRelname() {
		return relname;
	}

	public void setRelname(String relname) {
		this.relname = relname;
	}

	public Date getUsertime() {
		return usertime;
	}

	public void setUsertime(Date usertime) {
		this.usertime = usertime;
	}

	public String getUserphone() {
		return userphone;
	}

	public void setUserphone(String userphone) {
		this.userphone = userphone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIsadmin() {
		return isadmin;
	}
	public void setIsadmin(String isadmin) {
		this.isadmin = isadmin;
	}
	
	
	public String getMessage() {
		return message;
	}








	public void setMessage(String message) {
		this.message = message;
	}








	public String getAusername() {
		return ausername;
	}








	public void setAusername(String ausername) {
		this.ausername = ausername;
	}








	public String getAdminpassword() {
		return adminpassword;
	}








	public void setAdminpassword(String adminpassword) {
		this.adminpassword = adminpassword;
	}








	public String getAdminname() {
		return adminname;
	}








	public void setAdminname(String adminname) {
		this.adminname = adminname;
	}








	public String getAdminqx() {
		return adminqx;
	}








	public void setAdminqx(String adminqx) {
		this.adminqx = adminqx;
	}



	public int getPagenum() {
		return pagenum;
	}


	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}


	public String getKeyword() {
		return keyword;
	}


	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}


	/* (non-Javadoc)
	 * @see org.apache.struts2.interceptor.RequestAware#setRequest(java.util.Map)
	 */
	@Override
	public void setRequest(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;
	}

}
