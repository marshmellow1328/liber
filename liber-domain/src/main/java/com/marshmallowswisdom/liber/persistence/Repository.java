package com.marshmallowswisdom.liber.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;

import com.marshmallowswisdom.liber.domain.Article;
import com.marshmallowswisdom.liber.domain.ArticleVersion;
import com.marshmallowswisdom.liber.domain.Tag;

public class Repository {
	
	private final EntityManagerFactory factory;
	
	public Repository() {
		factory = Persistence.createEntityManagerFactory( "liber" );
	}
	
	public ArticleVersion saveArticleVersion( ArticleVersion articleVersion ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		articleVersion = entityManager.merge( articleVersion );
		transaction.commit();
		entityManager.close();
		return articleVersion;
	}

	public List<Tag> retrieveTags() {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Tag> query = criteriaBuilder.createQuery( Tag.class );
		final Root<Tag> root = query.from( Tag.class );
		query.select( root );
		final List<Tag> tags = entityManager.createQuery( query ).getResultList();
		entityManager.close();
		return tags;
	}

	public Tag retrieveTag( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Tag> query = criteriaBuilder.createQuery( Tag.class );
		final Root<Tag> root = query.from( Tag.class );
		root.fetch( "childTags", JoinType.LEFT );
		root.fetch( "articles", JoinType.LEFT );
		query.where( criteriaBuilder.equal( root.get( "id" ), id ) );
		final Tag tag = entityManager.createQuery( query ).setMaxResults( 1 ).getSingleResult();
		Tag parent = tag.getParent();
		while( parent != null ) {
			parent = parent.getParent();
		}
		entityManager.close();
		return tag;
	}
	
	public Tag retrieveTag( final String name ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Tag> query = criteriaBuilder.createQuery( Tag.class );
		final Root<Tag> root = query.from( Tag.class );
		query.where( criteriaBuilder.equal( root.get( "name" ), name ) );
		final Tag tag = entityManager.createQuery( query ).setMaxResults( 1 ).getSingleResult();
		entityManager.close();
		return tag;
	}
	
	public Tag retrieveTagByPath( final String path ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Tag> query = criteriaBuilder.createQuery( Tag.class );
		final Root<Tag> root = query.from( Tag.class );
		root.fetch( "articles", JoinType.LEFT );
		query.where( criteriaBuilder.equal( root.get( "path" ), path ) );
		final Tag tag = entityManager.createQuery( query ).setMaxResults( 1 ).getSingleResult();
		entityManager.close();
		return tag;
	}

	public Tag saveTag( Tag tag ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		tag = entityManager.merge( tag );
		transaction.commit();
		entityManager.close();
		return tag;
	}

	public List<Article> retrieveArticlesByTag( final int tagId ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Article> query = criteriaBuilder.createQuery( Article.class );
		final Root<Article> root = query.from( Article.class );
		Join<Article,ArticleVersion> version = root.join( "versions", JoinType.LEFT );
		Join<ArticleVersion,Tag> tag = version.join( "tags", JoinType.LEFT );
		query.where( criteriaBuilder.equal( tag.get( "id" ), tagId ) );
		final List<Article> articles = entityManager.createQuery( query ).getResultList();
		entityManager.close();
		return articles;
	}

}
