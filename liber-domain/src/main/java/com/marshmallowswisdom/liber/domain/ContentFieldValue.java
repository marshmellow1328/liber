package com.marshmallowswisdom.liber.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="content_field_value")
public class ContentFieldValue {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne( fetch = FetchType.EAGER, cascade = {} )
	@JoinColumn( name = "article_version_id", referencedColumnName = "id" )
	private ArticleVersion articleVersion;
	@ManyToOne( fetch = FetchType.EAGER, cascade = {} )
	@JoinColumn( name = "field_id", referencedColumnName = "id" )
	private Field field;
	@Column
	private String value;
	
	@SuppressWarnings("unused")
	private ContentFieldValue() { /* for JPA */ }
	
	public ContentFieldValue( final Field field, final String value ) {
		this.field = field;
		this.value = value;
	}

	public void setArticleVersion( final ArticleVersion articleVersion ) {
		this.articleVersion = articleVersion;
	}
	
	public String getName() {
		return field.getName();
	}
	
	public String getType() {
		return field.getType();
	}
	
	public String getValue() {
		return value;
	}

}
