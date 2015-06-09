/**
 * 
 */
package com.juhun.dao;

import java.util.HashMap;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import com.juhun.entity.Admin;
import com.juhun.entity.Users;
import com.juhun.entity.WowOrder;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年5月31日 下午4:31:38
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class UserDao {
    private Configuration conf = new Configuration().configure();
    private ServiceRegistry registry =  new ServiceRegistryBuilder().applySettings(conf.getProperties()).buildServiceRegistry();
    private SessionFactory factory = conf.buildSessionFactory(registry);
    private Session session = factory.openSession();
    private Criteria criteria = session.createCriteria(Users.class);
    
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月13日 下午3:26:30
    	* @version 1.0  验证登录时顾客用户名密码是否正确
    	* @parameter  
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public Users checklogin(String username,String password){
    	criteria.add(Restrictions.eq("username", username));
    	criteria.add(Restrictions.eq("password", password));
    	List<Users> list = criteria.list();
    	if(list.size()>0){
    		return list.get(0);
    	}else {
			return null;
		}
    }
    
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月13日 下午3:52:11
    	* @version 1.0 
    	* @parameter 验证管理员登录 
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public Admin checkadmin(String adminname,String adminpassword){
    	String hql = "from Admin where ausername = ? and adminpassword=?";
    	Query query = session.createQuery(hql);
    	query.setParameter(0, adminname);
    	query.setParameter(1, adminpassword);
    	List<Admin> list = query.list();
    	if(list.size()>0){
    		return list.get(0);
    	}else {
			return null;
		}
    }
    @SuppressWarnings("unchecked")
	public boolean CheckUsername(String  username){
    	//使用org.hibernate.criterion.Restrictions的各种静态方法传回org
    	criteria.add(Restrictions.eq("username", username));
    	List<Users> list = criteria.list();
    	if(list.size()>0){
    		return false;
    	}else {
			return true;
		}
    }
    public boolean AddUser(Users users){
    	//开启回滚模式
    	Transaction tran = session.beginTransaction();
    	session.save(users);
    	 tran.commit();
         return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月30日 下午9:54:43
    	* @version 1.0 
    	* @parameter  获取所有管理员账号
    	* @since 
     	* @return
     */
    @SuppressWarnings("unchecked")
	public Page SelectWowOrder(HashMap<String, String> search,int pagenum,int pagesi){
    	String keyword = search.get("keyword");
    	String adminqx = search.get("adminqx"); 
    	String hql = "from Admin where adminqx like '%"+adminqx+"%' and ( ausername like '%"+keyword+"%' or adminname like '%"+keyword+"%') ";
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
    public boolean SaveAdmin(Admin admin){
    	Transaction tran = session.beginTransaction();
    	session.save(admin);
    	tran.commit();
    	return true;
    }
    public boolean UpdateAdmin(Admin admin){
    	Transaction transaction = session.beginTransaction();
    	session.update(admin);
    	transaction.commit();
    	return true;
    }
    @SuppressWarnings("unchecked")
	public boolean checkadminname(String ausername){
    	String hql = "from Admin where ausername = ?";
    	Query query = session.createQuery(hql);
    	query.setParameter(0, ausername);
    	List<Admin> list = query.list();
    	if(list.size()>0){
    		return true;
    	}else {
			return false;
		}
    }
    public boolean DeleteAdmin(String id){
    	Transaction tran = session.beginTransaction();
    	Query query = session.createQuery(" delete from Admin where id = ? ");
    	query.setParameter(0, id);//设定条件参数 
    	 query.executeUpdate();//执行语句  
    	tran.commit();
    	return true;
    }
    /**
     * * @author  宋超: 
    	* @date 创建时间：2015年5月17日 下午1:46:06
    	* @version 1.0 
    	* @parameter  更新顾客信息
    	* @since 
     	* @return
     */
    public boolean updateguke(Users guke){
    	Transaction tran = session.beginTransaction();
    	session.update(guke);
    	 tran.commit();
         return true;
    }
}
