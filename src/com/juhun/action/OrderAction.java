/**
 * 
 */
package com.juhun.action;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.juhun.entity.Admin;
import com.juhun.entity.Users;
import com.juhun.entity.WowOrder;
import com.juhun.service.OrderService;
import com.juhun.util.Page;
import com.opensymphony.xwork2.ActionSupport;

/** * @author  宋超: 
 * @date 创建时间：2015年5月30日 上午9:28:26
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class OrderAction extends ActionSupport implements RequestAware,SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1446240177342266869L;
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
	private File photo;//菜肴图片
	private String photoFileName;
	private String photoContentType;
	private String dname;//角色名称
	private OrderService orderService = new OrderService();
	private Map<String, Object> request;
	private Map<String, Object> session;
	private String projectclass;//游戏类型 
	private int pagenum;
	private String message;
	private String username;//订单所属用户
	private String ids;
	/**
	 * * @author  宋超: 
		* @date 创建时间：2015年5月30日 上午10:51:35
		* @version 1.0 
		* @parameter  添加WOW订单
		* @since 
	 	* @return
	 */
	public String AddWowOrder() throws IOException{
		if(ordercount != null){
			boolean flag = orderService.CheckOrderCount(ordercount);
			if(flag){
				request.put("mess", "error");
				return SUCCESS;
			}
			}
		WowOrder wowOrder = new WowOrder();
		if(session.get("users") != null){
			Users users = (Users) session.get("users");
			wowOrder.setUsername(users.getUsername());
		}
		String imagename = "";
		if(photoFileName != null){
		String path = ServletActionContext.getServletContext().getRealPath("/");
		System.out.println(path+"upload");
		File file=new File(path+"upload");
		if(!file.exists()){
			file.mkdir();
		}
		int point = photoFileName.lastIndexOf(".");
		String cl = photoFileName.substring(point);
		imagename = System.currentTimeMillis()+cl;
		FileUtils.copyFile(photo, new File(file, imagename));
		System.out.println(imagename);
		}
		wowOrder.setMibaoka("upload/"+imagename);
		wowOrder.setOrdercount(ordercount);
		wowOrder.setWowname(wowname);
		wowOrder.setOrdernote(ordernote);
		wowOrder.setWangwang(wangwang);
		wowOrder.setZhenying(zhenying);
		wowOrder.setZhiye(zhiye);
		wowOrder.setOrderprice(orderprice);
		wowOrder.setOrderproject(orderproject);
		wowOrder.setMobliephone(mobliephone);
		wowOrder.setProjectclass("0");
		wowOrder.setOrderzhuangtai("0");
		wowOrder.setCreatetime(new Date());
		orderService.AddWowOrder(wowOrder);
		request.put("mess", "success");
		return SUCCESS;
	}
	/**
	 * * @author  宋超: 
		* @date 创建时间：2015年5月30日 下午2:59:53
		* @version 1.0 保存暗黑订单
		* @parameter  
		* @since 
	 	* @return
	 */
	public String AddDOrder() throws IOException{
		if(ordercount != null){
			boolean flag = orderService.CheckOrderCount(ordercount);
			if(flag){
				request.put("mess", "error");
				return SUCCESS;
			}
			}
		WowOrder wowOrder = new WowOrder();
		if(session.get("users") != null){
			Users users = (Users) session.get("users");
			wowOrder.setUsername(users.getUsername());
		}
		String imagename = "";
		if(photoFileName != null){
		String path = ServletActionContext.getServletContext().getRealPath("/");
		System.out.println(path+"upload");
		File file=new File(path+"upload");
		if(!file.exists()){
			file.mkdir();
		}
		int point = photoFileName.lastIndexOf(".");
		String cl = photoFileName.substring(point);
		imagename = System.currentTimeMillis()+cl;
		FileUtils.copyFile(photo, new File(file, imagename));
		System.out.println(imagename);
		}
		wowOrder.setMibaoka("upload/"+imagename);
		wowOrder.setOrdercount(ordercount);
		wowOrder.setWowname(wowname);
		wowOrder.setOrdernote(ordernote);
		wowOrder.setWangwang(wangwang);
		wowOrder.setZhiye(zhiye);
		wowOrder.setOrderprice(orderprice);
		wowOrder.setOrderproject(orderproject);
		wowOrder.setMobliephone(mobliephone);
		wowOrder.setCreatetime(new Date());
		wowOrder.setProjectclass("1");
		wowOrder.setOrderzhuangtai("0");
		orderService.AddWowOrder(wowOrder);
		request.put("mess", "success");
		return SUCCESS;
	}
	/**
	 * * @author  宋超: 
		* @date 创建时间：2015年5月30日 下午4:42:36
		* @version 1.0 
		* @parameter  
		* @since  通过条件查询
	 	* @return
	 * @throws UnsupportedEncodingException 
	 */
	public String searchByuser() throws UnsupportedEncodingException{
		if(dname != null && !"".equals(dname)){
			dname = new String(dname.getBytes("ISO-8859-1"),"utf-8");
			List<WowOrder> orderlist = orderService.Selectbyuser(dname);
			if(orderlist != null && orderlist.size() != 0){
				request.put("orderlist", orderlist);
				request.put("message", "success");
			}else {
				request.put("message", "wu");
			}
		}else {
			request.put("message", "cha");
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
	public String searchWowOrder() throws UnsupportedEncodingException{
		int num = 0;
		if(pagenum==0 || ("").equals(pagenum)){
		num = 0 ;
		}else{
			num = pagenum - 1;
		}
		int pagesi = 10;
		HashMap<String, String> search = new HashMap<String, String>();
		if(dname != null){
			dname = new String(dname.getBytes("ISO-8859-1"),"utf-8");
			search.put("keyword", dname);
		}else {
			search.put("keyword", "");
		}
		if(orderzhuangtai != null){
			search.put("orderzhuangtai", orderzhuangtai);
		}else {
			search.put("orderzhuangtai", "");
		}
		if(projectclass != null){
			search.put("projectclass", projectclass);
		}else {
			search.put("projectclass", "");
		}
		Page page = orderService.SelectWowUser(search, num*pagesi, pagesi);
		if(page != null ){
        request.put("page", page);
        request.put("selectmess", "success");
		}else{
		request.put("selectmess", "wu");	
		}
        return SUCCESS;
	}
	/**
	 * * @author  宋超: 
		* @date 创建时间：2015年5月31日 下午2:22:34
		* @version 1.0 
		* @parameter  查询单个订单
		* @since 
	 	* @return
	 */
	public String ChaOrderByID(){
		WowOrder wowOrder = orderService.selectwow(id);
		if(wowOrder != null){
			request.put("woworder", wowOrder);
		}
		return  SUCCESS;
	}
	/**
	 * * @author  宋超: 
		* @date 创建时间：2015年5月31日 下午2:22:24
		* @version 1.0 
		* @parameter  更变状态
		* @since 
	 	* @return
	 */
	public String UpdateZhuang(){
		Admin admin = (Admin) session.get("admin");
		WowOrder wowOrder = orderService.selectwow(id);
		wowOrder.setOrderzhuangtai(orderzhuangtai);
		wowOrder.setOrderadmin(admin.getAusername());
		wowOrder.setPifutime(new Date());
		boolean flag = orderService.updateZhuang(wowOrder);
		if(flag){
			request.put("updatemess", "success");
			this.message = "success";
		}else {
			this.message = "error";
			request.put("updatemess", "error");
		}
		return SUCCESS;
	}
	public String TongjiByDay(){
		HashMap<String, String> map = new HashMap<String, String>();
		if(dname != null && !"".equals(dname)){
		map = (HashMap<String, String>) orderService.OrderByDay(dname);
		}else {
			Date date=new Date();
			DateFormat format=new SimpleDateFormat("yyyy-MM-dd");
			String time=format.format(date); 
			map = (HashMap<String, String>) orderService.OrderByDay(time);
		}
		request.put("daymap", map);
		return SUCCESS;
	}
	
	public String DeleteOrder(){
		boolean flag = orderService.DeleteOrder(id);
		if(flag){
			this.message = "success";
		}else{
			this.message = "error";
		}
		return SUCCESS;
	}
	
	//批量删除admin
    public String DeleteOrders(){
        //String ids = this.ids;
        String[] ids = this.ids.split(",");
        try {
            for (int i = 0; i < ids.length; i++) {
                Integer keid = Integer.parseInt(ids[i]);
                orderService.DeleteOrder(keid);
            }
            this.message = "success";
        } catch (NumberFormatException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            this.message = "error";
        }
        return SUCCESS;
    }
	
    
    
	public String searchOrderByUser() throws UnsupportedEncodingException{
		int num = 0;
		if(pagenum==0 || ("").equals(pagenum)){
		num = 0 ;
		}else{
			num = pagenum - 1;
		}
		int pagesi = 10;
		Users users = new Users();
		if(session.get("users") != null){
		users = (Users) session.get("users");
		}
		Page page = orderService.SeleteOrderByUser(users.getUsername(), num*pagesi, pagesi);
		if(page != null ){
        request.put("page", page);
		}
        return SUCCESS;
	}
	//get set
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



	public File getPhoto() {
		return photo;
	}



	public void setPhoto(File photo) {
		this.photo = photo;
	}



	public String getPhotoFileName() {
		return photoFileName;
	}



	public void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}



	public String getPhotoContentType() {
		return photoContentType;
	}



	public void setPhotoContentType(String photoContentType) {
		this.photoContentType = photoContentType;
	}



	public String getDname() {
		return dname;
	}



	public void setDname(String dname) {
		this.dname = dname;
	}



	public String getProjectclass() {
		return projectclass;
	}
	public void setProjectclass(String projectclass) {
		this.projectclass = projectclass;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	public int getPagenum() {
		return pagenum;
	}
	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
	}
	@Override
	public void setSession(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.session = arg0;
	}



	@Override
	public void setRequest(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;
	}
	
	
	
	
}
