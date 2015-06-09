package com.juhun.util;

import java.util.List;


public class Page {
    private int sumcount;//总共的数据
    private int pageSize;//每页大小
    private int pageNumber;//当前页码
    private int sumpage;//总页数
    private List<?> list;
    public int getSumcount() {
        return sumcount;
    }
    public void setSumcount(int sumcount) {
        this.sumcount = sumcount;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getPageNumber() {
        return pageNumber;
    }
    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }
    public int getSumpage() {
        if(sumcount%pageSize > 0){
            this.sumpage = sumcount/pageSize+1;
            }else {
                this.sumpage = sumcount/pageSize;
            }
        return sumpage;
    }
    public void setSumpage(int sumpage) {
        if(sumcount%pageSize > 0){
        this.sumpage = sumcount/pageSize+1;
        }else {
            this.sumpage = sumcount/pageSize;
        }
    }
    public List<?> getList() {
        return list;
    }
    public void setList(List<?> list) {
        this.list = list;
    }
    @Override
    public String toString() {
        return "Page [sumcount=" + sumcount + ", pageSize=" + pageSize
                + ", pageNumber=" + pageNumber + ", sumpage=" + sumpage
                + ", list=" + list + "]";
    }
    public Page(int sumcount, int pageSize, int pageNumber, int sumpage,
            List<?> list) {
        super();
        this.sumcount = sumcount;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.sumpage = sumpage;
        this.list = list;
    }
    public Page() {
        super();
    }
    
}
