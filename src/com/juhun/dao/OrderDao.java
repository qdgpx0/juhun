/**
 * 
 */
package com.juhun.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

import com.juhun.entity.WowOrder;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年5月30日 上午9:25:59
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class OrderDao {
    private Configuration conf = new Configuration().configure();
    private ServiceRegistry registry =  new ServiceRegistryBuilder().applySettings(conf.getProperties()).buildServiceRegistry();
    private SessionFactory factory = conf.buildSessionFactory(registry);
    private Session session = factory.openSession();
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月30日 上午9:39:08
    	* @version 1.0 
    	* @parameter  保存wow订单
    	* @since 
     	* @return
     */
    public boolean SaveWowOrder(WowOrder wowOrder){
        Transaction tran = session.beginTransaction();
        session.save(wowOrder);
        tran.commit();
        return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月30日 上午10:48:46
    	* @version 1.0 
    	* @parameter  检验订单编号是否重复
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public boolean CheckOrderCount(String ordercount){
    	Query query = session.createQuery("from WowOrder where ordercount = ? ");
    	query.setParameter(0, ordercount);
    	List<WowOrder> caiyaolist = query.list();
    	if(caiyaolist.size() != 0 && caiyaolist != null){
    		return true;
    	}else {
			return false;
		}
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月30日 下午4:37:21
    	* @version 1.0 
    	* @parameter  进度查询
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public List<WowOrder> selectAllByuser(String keyword){
    	String hql = "from WowOrder where wangwang = ? or ordercount = ? or wowname = ?";
    	Query query = session.createQuery(hql);
    	query.setParameter(0, keyword);
    	query.setParameter(1, keyword);
    	query.setParameter(2, keyword);
    	List<WowOrder> wowlist = query.list();
    	if(wowlist != null && wowlist.size() != 0){
    		return wowlist;
    	}else{
    		return null;
    	}
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月30日 下午9:54:43
    	* @version 1.0 
    	* @parameter  获取所有WOW订单
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public Page SelectWowOrder(HashMap<String, String> search,int pagenum,int pagesi){
    	String keyword = search.get("keyword");
    	String projectclass = search.get("projectclass"); 
    	String orderzhuangtai = search.get("orderzhuangtai"); 
    	String hql = "from WowOrder where projectclass like '%"+projectclass+"%' and ( ordercount like '%"+keyword+"%' or wowname like '%"+keyword+"%' or wangwang like '%"+keyword+"%' ) and orderzhuangtai like '%"+orderzhuangtai+"%' order by createtime desc";
    	Query query = session.createQuery(hql);
     	List<WowOrder> sumpage = query.list();
     	query = session.createQuery(hql);
    	query.setFirstResult(pagenum);
        query.setMaxResults(10);
     	List<WowOrder> wowlist = query.list();
     	 pagenum = pagenum/pagesi;
         Page page = new Page();
         page.setSumcount(sumpage.size());
         page.setPageSize(pagesi);
         page.setPageNumber(pagenum+1);
         page.setList(wowlist);
    	return page;
    }
    
    @SuppressWarnings("unchecked")
	public Page SelectOrderByUser(String username,int pagenum,int pagesi){
    	String hql = "from WowOrder where username = '"+username+"' order by createtime desc";
    	Query query = session.createQuery(hql);
     	List<WowOrder> sumpage = query.list();
     	query = session.createQuery(hql);
    	query.setFirstResult(pagenum);
        query.setMaxResults(10);
     	List<WowOrder> wowlist = query.list();
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
    	* @date 创建时间：2015年5月31日 上午11:33:27
    	* @version 1.0 
    	* @parameter  通过ID查询订单
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public WowOrder SelectOrderById(int id){
    	String hql = "from WowOrder where id = ?";
    	Query query = session.createQuery(hql);
    	query.setParameter(0, id);
    	List<WowOrder> list = query.list();
    	if(list != null && list.size() >0){
    		return list.get(0);
    	}else {
    		return null;
		}
    	
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月31日 上午11:33:40
    	* @version 1.0 
    	* @parameter  改变订单状态
    	* @since 
     	* @return
     */
    public boolean UpdateZhuang(WowOrder wowOrder){
    	Transaction tran = session.beginTransaction();
    	session.update(wowOrder);
    	tran.commit();
    	return true;
    }
    
    @SuppressWarnings("unchecked")
	public Map<String, String> TongjiByDay(String date){
    	String sql = "SELECT SUM(orderprice),COUNT(*),AVG(orderprice) FROM juhun_woworder WHERE createtime LIKE '%"+date+"%' and orderzhuangtai != '4'";
    	Query query = session.createSQLQuery(sql);
    	List<Object[]> listo = query.list();
    	List<String> lists = new ArrayList<String>();
    	for (int i = 0; i < listo.get(0).length; i++) {
			lists.add(listo.get(0)[i]+"");
		}
    	HashMap<String, String> map = new HashMap<String, String>();
    	if(lists.get(0) != null && !"".equals(lists.get(0)) && !"null".equals(lists.get(0))){
    		map.put("zongjia", lists.get(0)+"");
    		map.put("pingjunjia", lists.get(2)+"");
    	}else {
    		map.put("zongjia", "0");
    		map.put("pingjunjia","0");
		}
    	map.put("ordercount", lists.get(1)+"");
    	sql = "SELECT SUM(orderprice),COUNT(*) FROM juhun_woworder WHERE createtime LIKE '%"+date+"%' and orderzhuangtai = '4'";
    	query = session.createSQLQuery(sql);
    	listo = query.list();
    	lists = new ArrayList<String>();
    	for (int i = 0; i < listo.get(0).length; i++) {
			lists.add(listo.get(0)[i]+"");
		}
    	if(lists.get(0) != null && !"".equals(lists.get(0)) && !"null".equals(lists.get(0))){
    		map.put("tuidanzong", lists.get(0)+"");
    	}else {
    		map.put("tuidanzong", "0");
		}
    	map.put("tuidanshu", lists.get(1)+"");
    	map.put("datetime", date);
    	Float chajia = Float.parseFloat(map.get("zongjia"))-Float.parseFloat(map.get("tuidanzong"));
    	map.put("chajia", chajia+"");
    	return map;
    }
    
    public boolean DeleteOrder(Integer id){
    	Transaction tran = session.beginTransaction();
    	Query query = session.createQuery(" delete from WowOrder where id = ? ");
    	query.setParameter(0, id);//设定条件参数 
    	 query.executeUpdate();//执行语句  
    	tran.commit();
    	return true;
    }
}
