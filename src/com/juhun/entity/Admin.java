/**
 * 
 */
package com.juhun.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/** * @author  宋超: 
 * @date 创建时间：2015年5月31日 下午4:37:09
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
@Entity
@Table(name = "juhun_admin", catalog = "qdgpx0")
public class Admin implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5558186818183512192L;
	private String id;
	private String ausername;
	private String adminpassword;
	private String adminname;
	private String adminqx;
	@Override
	public String toString() {
		return "Admin [id=" + id + ", ausername=" + ausername
				+ ", adminpassword=" + adminpassword + ", adminname="
				+ adminname + ", adminqx=" + adminqx + "]";
	}
	public Admin(String id, String ausername, String adminpassword,
			String adminname, String adminqx) {
		super();
		this.id = id;
		this.ausername = ausername;
		this.adminpassword = adminpassword;
		this.adminname = adminname;
		this.adminqx = adminqx;
	}
	public Admin() {
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
	
}
