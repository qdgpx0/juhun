/**
 * 
 */
package com.juhun.action;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.juhun.entity.Admin;
import com.juhun.entity.News;
import com.juhun.service.NewsService;
import com.juhun.util.Page;
import com.opensymphony.xwork2.ActionSupport;

/** * @author  宋超: 
 * @date 创建时间：2015年6月1日 下午9:23:51
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class NewsAction extends ActionSupport implements RequestAware,SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2353923801325363240L;
	private Map<String, Object> request;
	private Map<String, Object> session;
	private Integer id;//唯一标识符
	private String newsnote;//新闻内容
	private String newstime;//新闻时间
	private String newsadmin;//新闻管理员
	private int pagenum;
	private String message;
	private NewsService newsService = new  NewsService();
	private String keyword;
	private String ids;
	
	public String AddNews(){
		News news = new News();
		if(session.get("admin")!=null){
			Admin admin = (Admin) session.get("admin");
			news.setNewsadmin(admin.getAusername());
		}
		news.setNewsnote(newsnote);
		news.setNewstime(new Date());
		boolean flag = newsService.AddNews(news);
		if(flag){
			this.message = "success";
		}else{
			this.message = "error";
		}
		return SUCCESS;
	}
	
	public String DeleteNews(){
		boolean flag = newsService.DeleteNews(id);
		if(flag){
			this.message = "success";
		}else{
			this.message = "error";
		}
		return SUCCESS;
	}
	
	public String UpdateNews(){
		News news = new News();
		if(session.get("admin")!=null){
			Admin admin = (Admin) session.get("admin");
			news.setNewsadmin(admin.getAusername());
		}
		news.setId(id);
		news.setNewsnote(newsnote);
		news.setNewstime(new Date());
		boolean flag = newsService.UpdateNews(news);
		if(flag){
			this.message = "success";
		}else{
			this.message = "error";
		}
		return SUCCESS;
		
	}
	
	public String SelectUsers(){
		List<News> listnews = newsService.SelectToUsers();
		if(listnews != null){
			request.put("listnews",listnews);
		}else{
			request.put("listnews","");
		}
		return SUCCESS;
	}
	
	
	public String searchNewsAll() throws UnsupportedEncodingException{
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
		Page page = newsService.SelectNews(search, num*pagesi, pagesi);
		if(page != null ){
        request.put("page", page);
        request.put("selectmess", "success");
		}else{
		request.put("selectmess", "wu");	
		}
        return SUCCESS;
	}
	
	
	//批量删除admin
    public String DeleteNewss(){
        //String ids = this.ids;
        String[] ids = this.ids.split(",");
        try {
            for (int i = 0; i < ids.length; i++) {
                Integer keid = Integer.parseInt(ids[i]);
                newsService.DeleteNews(keid);
            }
            this.message = "success";
        } catch (NumberFormatException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            this.message = "error";
        }
        return SUCCESS;
    }
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNewsnote() {
		return newsnote;
	}

	public void setNewsnote(String newsnote) {
		this.newsnote = newsnote;
	}

	public String getNewstime() {
		return newstime;
	}

	public void setNewstime(String newstime) {
		this.newstime = newstime;
	}

	public String getNewsadmin() {
		return newsadmin;
	}

	public void setNewsadmin(String newsadmin) {
		this.newsadmin = newsadmin;
	}


	public int getPagenum() {
		return pagenum;
	}

	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	
	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	@Override
	public void setRequest(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;
	}

	@Override
	public void setSession(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		this.session = arg0;
	}

}
