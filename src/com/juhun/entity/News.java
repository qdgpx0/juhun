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
 * @date 创建时间：2015年6月1日 下午9:16:16
 * @version 1.0 
 * @parameter  
 * @since 
 * @return  */
@Entity
@Table(name = "juhun_news", catalog = "qdgpx0")
public class News implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9097091587393748561L;
	private Integer id;//唯一标识符
	private String newsnote;//新闻内容
	private Date newstime;//新闻时间
	private String newsadmin;//新闻管理员
	@Override
	public String toString() {
		return "News [id=" + id + ", newsnote=" + newsnote + ", newstime="
				+ newstime + ", newsadmin=" + newsadmin + "]";
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
	public String getNewsnote() {
		return newsnote;
	}
	public void setNewsnote(String newsnote) {
		this.newsnote = newsnote;
	}

	public Date getNewstime() {
		return newstime;
	}
	public void setNewstime(Date newstime) {
		this.newstime = newstime;
	}
	public String getNewsadmin() {
		return newsadmin;
	}
	public void setNewsadmin(String newsadmin) {
		this.newsadmin = newsadmin;
	}
	public News(Integer id, String newsnote, String newstime, String newsadmin) {
		super();
		this.id = id;
		this.newsnote = newsnote;
		this.newsadmin = newsadmin;
	}
	public News() {
		super();
	}
	
}
