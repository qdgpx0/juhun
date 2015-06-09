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
 * @date 创建时间：2015年5月30日 上午9:26:49
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
/** * @author  宋超: 
	* @date 创建时间：2015年5月30日 上午10:03:54
	* @version 1.0 
	* @parameter  
	* @since 
 	* @return  */
@Entity
@Table(name = "juhun_woworder", catalog = "qdgpx0")
public class WowOrder implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8777410848139908825L;

	private Integer id;//唯一标识符	
	private String ordercount;//订单编号
	private String wowname;//角色名称
	private String wangwang;//旺旺名称
	private String zhiye;//职业
	private float orderprice;//订单价格
	private String orderproject;//代练项目
	private String mobliephone;//电话
	private String ordernote;//订单内容
	private String mibaoka;//密保卡
	private Date createtime;//创建时间
	private String orderadmin;//订单处理人
	private String pifuurl;//批复照片
	private String orderzhuangtai;//订单状态
	private Date pifutime;//批复时间
	private String  zhenying;//阵营
	private String projectclass;//游戏类型 
	private String username;//订单所属用户
	
	public WowOrder() {
		super();
	}
	public WowOrder(Integer id, String ordercount, String wowname,
			String wangwang, String zhiye, float orderprice,
			String orderproject, String mobliephone, String ordernote,
			String mibaoka, Date createtime, String orderadmin, String pifuurl,
			String orderzhuangtai, Date pifutime) {
		super();
		this.id = id;
		this.ordercount = ordercount;
		this.wowname = wowname;
		this.wangwang = wangwang;
		this.zhiye = zhiye;
		this.orderprice = orderprice;
		this.orderproject = orderproject;
		this.mobliephone = mobliephone;
		this.ordernote = ordernote;
		this.mibaoka = mibaoka;
		this.createtime = createtime;
		this.orderadmin = orderadmin;
		this.pifuurl = pifuurl;
		this.orderzhuangtai = orderzhuangtai;
		this.pifutime = pifutime;
	}
	@Override
	public String toString() {
		return "WowOrder [id=" + id + ", ordercount=" + ordercount
				+ ", wowname=" + wowname + ", wangwang=" + wangwang
				+ ", zhiye=" + zhiye + ", orderprice=" + orderprice
				+ ", orderproject=" + orderproject + ", mobliephone="
				+ mobliephone + ", ordernote=" + ordernote + ", mibaoka="
				+ mibaoka + ", createtime=" + createtime + ", orderadmin="
				+ orderadmin + ", pifuurl=" + pifuurl + ", orderzhuangtai="
				+ orderzhuangtai + ", pifutime=" + pifutime + "]";
	}
	
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getOrdercount() {
		return ordercount;
	}
	public void setOrdercount(String ordercount) {
		this.ordercount = ordercount;
	}
	public String getWowname() {
		return wowname;
	}
	public void setWowname(String wowname) {
		this.wowname = wowname;
	}
	public String getWangwang() {
		return wangwang;
	}
	public void setWangwang(String wangwang) {
		this.wangwang = wangwang;
	}
	public String getZhiye() {
		return zhiye;
	}
	public void setZhiye(String zhiye) {
		this.zhiye = zhiye;
	}
	public float getOrderprice() {
		return orderprice;
	}
	public void setOrderprice(float orderprice) {
		this.orderprice = orderprice;
	}
	public String getOrderproject() {
		return orderproject;
	}
	public void setOrderproject(String orderproject) {
		this.orderproject = orderproject;
	}
	public String getMobliephone() {
		return mobliephone;
	}
	public void setMobliephone(String mobliephone) {
		this.mobliephone = mobliephone;
	}
	public String getOrdernote() {
		return ordernote;
	}
	public void setOrdernote(String ordernote) {
		this.ordernote = ordernote;
	}
	public String getMibaoka() {
		return mibaoka;
	}
	public void setMibaoka(String mibaoka) {
		this.mibaoka = mibaoka;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public String getOrderadmin() {
		return orderadmin;
	}
	public void setOrderadmin(String orderadmin) {
		this.orderadmin = orderadmin;
	}
	public String getPifuurl() {
		return pifuurl;
	}
	public void setPifuurl(String pifuurl) {
		this.pifuurl = pifuurl;
	}
	public String getOrderzhuangtai() {
		return orderzhuangtai;
	}
	public void setOrderzhuangtai(String orderzhuangtai) {
		this.orderzhuangtai = orderzhuangtai;
	}
	public Date getPifutime() {
		return pifutime;
	}
	public void setPifutime(Date pifutime) {
		this.pifutime = pifutime;
	}
	public String getZhenying() {
		return zhenying;
	}
	public void setZhenying(String zhenying) {
		this.zhenying = zhenying;
	}
	public String getProjectclass() {
		return projectclass;
	}
	public void setProjectclass(String projectclass) {
		this.projectclass = projectclass;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
