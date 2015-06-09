/**
 * 
 */
package com.juhun.service;

import java.util.HashMap;
import java.util.List;

import com.juhun.dao.NewsDao;
import com.juhun.entity.News;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年6月1日 下午9:21:48
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class NewsService {
	private NewsDao newsDao = new NewsDao();
	public boolean AddNews(News news){
		return newsDao.SaveNews(news);
	}
	
	public boolean DeleteNews(Integer id){
		return newsDao.DeleteNews(id);
	}
	
	public boolean UpdateNews(News news){
		return newsDao.UpdateNews(news);
	}
	
	public Page SelectNews(HashMap<String, String> search,int pagenum,int pagesi){
		return newsDao.SeleteNews(search, pagenum, pagesi);
	}
	
	public List<News> SelectToUsers(){
		return newsDao.SelectUsers();
	}
}
