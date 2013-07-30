package com.marshmallowswisdom.liber.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tag")
public class Tag {
	
	private static final String PATH_DIVIDER = "/";
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column
	private String name;
	@ManyToOne
	@JoinColumn(name="parent_tag_id", referencedColumnName="id")
	private Tag parent;
	@Column
	private String path;
	@OneToMany(mappedBy="parent", cascade=CascadeType.ALL)
	private Set<Tag> childTags;
	@ManyToMany
	@JoinTable( name = "article_version_tag", 
				joinColumns = {@JoinColumn( name = "tag_id", referencedColumnName = "id" )}, 
				inverseJoinColumns = {@JoinColumn( name = "article_version_id", 
													referencedColumnName = "id" ) } )
	private Set<ArticleVersion> articles;
	
	
	@SuppressWarnings("unused")
	private Tag() { /* for JPA */ }
	
	public Tag( final String name ) {
		this.name = name;
		updatePath();
		articles = new HashSet<ArticleVersion>();
	}
	
	public Tag( final String name, final Tag parent ) {
		this.name = name;
		this.parent = parent;
		updatePath();
		articles = new HashSet<ArticleVersion>();
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName( final String name ) {
		this.name = name;
		updatePath();
	}
	
	public Tag getParent() {
		return parent;
	}
	
	public void setParent( final Tag parent ) {
		this.parent = parent;
		updatePath();
	}
	
	public String getPath() {
		return path;
	}
	
	public Set<Tag> getChildTags() {
		return childTags;
	}
	
	public Set<ArticleVersion> getArticles() {
		return articles;
	}
	
	public void addArticle( final ArticleVersion article ) {
		articles.add( article );
	}
	
	public void removeArticle( final ArticleVersion article ) {
		articles.remove( article );
	}
	
	private void updatePath() {
		path = "";
		if( parent != null ) {
			path += parent.getPath();
		}
		path += PATH_DIVIDER + name;
	}

}
