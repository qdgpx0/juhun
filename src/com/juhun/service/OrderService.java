/**
 * 
 */
package com.juhun.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.juhun.dao.OrderDao;
import com.juhun.entity.WowOrder;
import com.juhun.util.Page;

/** * @author  宋超: 
 * @date 创建时间：2015年5月30日 上午9:27:52
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
public class OrderService {
	private OrderDao orderDao = new OrderDao();
	public boolean AddWowOrder(WowOrder wowOrder){
		return orderDao.SaveWowOrder(wowOrder);
	}
	public boolean CheckOrderCount(String ordercount){
		return orderDao.CheckOrderCount(ordercount);
	}
	public List<WowOrder> Selectbyuser(String keyword){
		return orderDao.selectAllByuser(keyword);
	}
	public Page SelectWowUser(HashMap<String, String> search,int pagenum,int pagesi){
		return orderDao.SelectWowOrder(search, pagenum, pagesi);
	}
	public WowOrder selectwow(int id){
		return orderDao.SelectOrderById(id);
	}
	public boolean updateZhuang(WowOrder wowOrder){
		return orderDao.UpdateZhuang(wowOrder);
	}
	public Map<String, String> OrderByDay(String date){
		return orderDao.TongjiByDay(date);
	}
	public boolean DeleteOrder(Integer id){
		return orderDao.DeleteOrder(id);
	}
	public Page SeleteOrderByUser(String username,int pagenum,int pagesi){
		return orderDao.SelectOrderByUser(username, pagenum, pagesi);
	}
}
