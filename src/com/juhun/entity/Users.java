/**
 * 
 */
package com.juhun.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/** * @author  宋超: 
 * @date 创建时间：2015年5月31日 下午4:32:28
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
@Entity
@Table(name = "juhun_users", catalog = "qdgpx0")
public class Users implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5558186818183512192L;
	private String id;//唯一标识符
	private String username;//用户名
	private String password;//密码
	private String relname;//真实姓名
	private Date usertime;//用户创建时间
	private String userphone;//用户电话
	private String address;//地址
	@Override
	public String toString() {
		return "Admin [id=" + id + ", username=" + username + ", password="
				+ password + ", relname=" + relname + ", usertime=" + usertime
				+ ", userphone=" + userphone + "]";
	}
	public Users(String id, String username, String password, String relname,
			Date usertime, String userphone) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.relname = relname;
		this.usertime = usertime;
		this.userphone = userphone;
	}
	public Users() {
		super();
	}
	
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
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
	
}
