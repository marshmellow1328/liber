package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import com.marshmallowswisdom.liber.domain.Tag;

public class RestfulTag {
	
	private final Tag tag;
	private final Tag parent;
	private final Collection<Tag> childTags;
	private final List<Link> links;
	
	public RestfulTag( final Tag tag, final Tag parent, final Collection<Tag> childTags ) {
		this.tag = tag;
		this.parent = parent;
		this.childTags = childTags;
		links = new ArrayList<Link>();
	}
	
	public void addLink( final Link link ) {
		links.add( link );
	}
	
	public List<Link> getLinks() {
		return links;
	}
	
	public int getId() {
		return tag.getId();
	}
	
	public String getName() {
		return tag.getName();
	}
	
	public List<RestfulTag> getChildTags() {
		final List<RestfulTag> children = new ArrayList<RestfulTag>();
		for( Tag child : childTags ) {
			//TODO refactor with TagsController to reduce duplication
			final RestfulTag restfulTag = new RestfulTag( child, null, Collections.<Tag> emptyList() );
			restfulTag.addLink( new Link( "self", "/liber-services/tags/" + child.getId() ) );
			restfulTag.addLink( new Link( "view", "/liber-web/tags/" + child.getId() ) );
			children.add( restfulTag );
		}
		return children;
	}
	
	public RestfulTag getParent() {
		if( parent == null ) {
			return null;
		}
		else if( parent.getParent() == null ) {
			return new RestfulTag( parent, null, Collections.<Tag> emptyList() );
		}
		else {
			return new RestfulTag( parent, parent.getParent(), Collections.<Tag> emptyList() );
		}
	}
	
	public String getPath() {
		return tag.getPath();
	}

}
