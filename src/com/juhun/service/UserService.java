/**
 * 
 */
package com.juhun.service;
import java.util.HashMap;
import com.juhun.dao.UserDao;
import com.juhun.entity.Admin;
import com.juhun.entity.Users;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年5月31日 下午4:42:15
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class UserService {
	private UserDao userDao = new UserDao();
	public Users checkloginguke(String username,String gukepassword){
		return userDao.checklogin(username, gukepassword);
	}
	public Admin checkloginadmin(String adminname,String adminpassword){
		return userDao.checkadmin(adminname, adminpassword);
	}
	public boolean CheckUsername(String username){
		return userDao.CheckUsername(username);
	}
	public boolean AddGuke(Users guke){
		return userDao.AddUser(guke);
	}
	public Page SelectWowUser(HashMap<String, String> search,int pagenum,int pagesi){
		return userDao.SelectWowOrder(search, pagenum, pagesi);
	}
	public boolean SaveAdmin(Admin admin){
		return userDao.SaveAdmin(admin);
	}
	public boolean UpdateAdmin(Admin admin){
		return userDao.UpdateAdmin(admin);
	}
	public boolean checkadminname(String ausernmae){
		return userDao.checkadminname(ausernmae);
	}
	public boolean DeleteAdmin(String id){
		return userDao.DeleteAdmin(id);
	}
	public boolean UpdateGuke(Users guke){
		return userDao.updateguke(guke);
	}
}
