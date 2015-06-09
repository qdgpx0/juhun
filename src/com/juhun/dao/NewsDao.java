/**
 * 
 */
package com.juhun.dao;

import java.util.HashMap;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

import com.juhun.entity.News;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年6月1日 下午9:22:37
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class NewsDao {
    private Configuration conf = new Configuration().configure();
    private ServiceRegistry registry =  new ServiceRegistryBuilder().applySettings(conf.getProperties()).buildServiceRegistry();
    private SessionFactory factory = conf.buildSessionFactory(registry);
    private Session session = factory.openSession();
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年6月1日 下午9:51:09
    	* @version 1.0 保存新闻
    	* @parameter  
    	* @since 
     	* @return
     */
    public boolean SaveNews(News news){
    	Transaction tran = session.beginTransaction();
    	session.save(news);
    	tran.commit();
    	return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年6月1日 下午9:51:19
    	* @version 1.0 
    	* @parameter  删除新闻
    	* @since 
     	* @return
     */
    public boolean DeleteNews(Integer id){
    	Transaction tran = session.beginTransaction();
    	Query query = session.createQuery(" delete from News where id = ? ");
    	query.setParameter(0, id);//设定条件参数 
    	query.executeUpdate();//执行语句  
    	tran.commit();
    	return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年6月1日 下午9:51:28
    	* @version 1.0 
    	* @parameter  更新公告
    	* @since 
     	* @return
     */
    public boolean UpdateNews(News news){
    	Transaction tran = session.beginTransaction();
    	session.update(news);
    	tran.commit();
    	return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年6月1日 下午9:51:36
    	* @version 1.0 
    	* @parameter  条件查询公告
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public Page SeleteNews(HashMap<String, String> search,int pagenum,int pagesi){
    	String keyword = search.get("keyword");
    	String hql = "from News where  newsnote like '%"+keyword+"%' or newsadmin like '%"+keyword+"%' ";
    	Query query = session.createQuery(hql);
     	List<News> sumpage = query.list();
     	query = session.createQuery(hql);
    	query.setFirstResult(pagenum);
        query.setMaxResults(10);
     	List<News> wowlist = query.list();
     	 pagenum = pagenum/pagesi;
         Page page = new Page();
         page.setSumcount(sumpage.size());
         page.setPageSize(pagesi);
         page.setPageNumber(pagenum+1);
         page.setList(wowlist);
    	return page;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年6月1日 下午9:51:49
    	* @version 1.0 
    	* @parameter  用户公告显示
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public List<News> SelectUsers(){
    	 String hql = " from News ORDER BY newstime desc ";
    	 Query query = session.createQuery(hql);
    	 query.setMaxResults(2);
    	 List<News> list = query.list();
    	 if(list!= null && list.size() != 0){
    		 return list;
    	 }else {
			return null;
		}
    }
}
