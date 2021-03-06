package com.marshmallowswisdom.liber.persistence;

import java.util.List;
import java.util.Map;

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
import com.marshmallowswisdom.liber.domain.ContentFieldValue;
import com.marshmallowswisdom.liber.domain.Field;
import com.marshmallowswisdom.liber.domain.FieldValue;
import com.marshmallowswisdom.liber.domain.HierarchicalFieldValue;
import com.marshmallowswisdom.liber.domain.Type;

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
	
	public Article saveNewArticle( Article article, ArticleVersion firstVersion ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		firstVersion = entityManager.merge( firstVersion );
		article = firstVersion.getArticle();
		article.setLatestVersion( firstVersion );
		transaction.commit();
		entityManager.close();
		return article;
	}
	
	public Article saveArticle( Article article ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		article = entityManager.merge( article );
		transaction.commit();
		entityManager.close();
		return article;
	}

	public Article retrieveArticle( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Article> query = criteriaBuilder.createQuery( Article.class );
		final Root<Article> root = query.from( Article.class );
		query.where( criteriaBuilder.equal( root.get( "id" ), id ) );
		final Article article = entityManager.createQuery( query ).getSingleResult();
		entityManager.close();
		return article;
	}
	
	public List<Article> retrieveArticles( final Map<String, String> criteria ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Article> query = criteriaBuilder.createQuery( Article.class );
		final Root<Article> root = query.from( Article.class );
		Join<Article,ArticleVersion> version = root.join( "latestVersion", JoinType.LEFT );
		for( String fieldName : criteria.keySet() ) {
			Join<ArticleVersion,ContentFieldValue> value = version.join( "fieldValues", 
																			JoinType.LEFT );
			Join<ContentFieldValue,Field> field = value.join( "field", JoinType.LEFT );
			query.where( criteriaBuilder.equal( field.get( "name" ), fieldName ) );
			query.where( criteriaBuilder.equal( value.get( "value" ), criteria.get( fieldName ) ) );
		}
		final List<Article> articles = entityManager.createQuery( query ).getResultList();
		entityManager.close();
		return articles;
	}

	public void deleteArticle( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final Article article = entityManager.find( Article.class, id );
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.remove( article );
		transaction.commit();
		entityManager.close();
	}

	public List<Field> retrieveFields() {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Field> query = criteriaBuilder.createQuery( Field.class );
		final Root<Field> root = query.from( Field.class );
		query.select( root );
		final List<Field> fields = entityManager.createQuery( query ).getResultList();
		entityManager.close();
		return fields;
	}

	public Field retrieveField( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Field> query = criteriaBuilder.createQuery( Field.class );
		final Root<Field> root = query.from( Field.class );
		query.where( criteriaBuilder.equal( root.get( "id" ), id ) );
		final Field field = entityManager.createQuery( query ).getSingleResult();
		entityManager.close();
		return field;
	}

	public Field saveField( final Field field ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		final Field savedField = entityManager.merge( field );
		transaction.commit();
		entityManager.close();
		return savedField;
	}
	
	public void deleteField( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final Field field = entityManager.find( Field.class, id );
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.remove( field );
		transaction.commit();
		entityManager.close();
	}

	public HierarchicalFieldValue retrieveFieldValue( final int id )  {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<HierarchicalFieldValue> query = 
				criteriaBuilder.createQuery( HierarchicalFieldValue.class );
		final Root<HierarchicalFieldValue> root = query.from( HierarchicalFieldValue.class );
		root.fetch( "childValues", JoinType.LEFT );
		query.where( criteriaBuilder.equal( root.get( "id" ), id ) );
		final HierarchicalFieldValue value = entityManager.createQuery( query ).getSingleResult();
		entityManager.close();
		return value;
	}

	public FieldValue saveFieldValue( final FieldValue value ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		final FieldValue savedValue = entityManager.merge( value );
		transaction.commit();
		entityManager.close();
		return savedValue;
	}

	public void deleteFieldValue( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		final FieldValue value = entityManager.find( FieldValue.class, id );
		final Field field = value.getField();
		field.removeValue( value );
		entityManager.remove( value );
		entityManager.merge( field );
		transaction.commit();
		entityManager.close();
	}

	public List<Type> retrieveTypes() {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Type> query = criteriaBuilder.createQuery( Type.class );
		final Root<Type> root = query.from( Type.class );
		query.select( root );
		final List<Type> types = entityManager.createQuery( query ).getResultList();
		entityManager.close();
		return types;
	}

	public Type retrieveType( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Type> query = criteriaBuilder.createQuery( Type.class );
		final Root<Type> root = query.from( Type.class );
		root.fetch( "fields", JoinType.LEFT );
		query.where( criteriaBuilder.equal( root.get( "id" ), id ) );
		final Type type = entityManager.createQuery( query ).getSingleResult();
		entityManager.close();
		return type;
	}

	public Type retrieveTypeByName( final String name ) {
		final EntityManager entityManager = factory.createEntityManager();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Type> query = criteriaBuilder.createQuery( Type.class );
		final Root<Type> root = query.from( Type.class );
		query.where( criteriaBuilder.equal( root.get( "name" ), name ) );
		final Type type = entityManager.createQuery( query ).setMaxResults( 1 ).getSingleResult();
		entityManager.close();
		return type;
	}

	public Type saveType( final Type type ) {
		final EntityManager entityManager = factory.createEntityManager();
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		final Type savedType = entityManager.merge( type );
		transaction.commit();
		entityManager.close();
		return savedType;
	}

	public void deleteType( final int id ) {
		final EntityManager entityManager = factory.createEntityManager();
		final Type type = entityManager.find( Type.class, id );
		final EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.remove( type );
		transaction.commit();
		entityManager.close();
	}

}
