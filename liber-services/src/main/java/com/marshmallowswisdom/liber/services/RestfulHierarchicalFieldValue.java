package com.marshmallowswisdom.liber.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import com.marshmallowswisdom.liber.domain.HierarchicalFieldValue;

public class RestfulHierarchicalFieldValue extends RestfulFieldValue {
	
	private final HierarchicalFieldValue value;
	private final HierarchicalFieldValue parent;
	private final Collection<HierarchicalFieldValue> childValues;
	
	public RestfulHierarchicalFieldValue( final HierarchicalFieldValue value, 
											final HierarchicalFieldValue parent, 
											final Collection<HierarchicalFieldValue> childValues ) {
		super( value );
		this.value = value;
		this.parent = parent;
		this.childValues = childValues;
	}
	
	public RestfulHierarchicalFieldValue getParent() {
		if( parent == null ) {
			return null;
		}
		else if( parent.getParent() == null ) {
			return new RestfulHierarchicalFieldValue( parent, 
												null, 
												Collections.<HierarchicalFieldValue> emptyList() );
		}
		else {
			return new RestfulHierarchicalFieldValue( parent, 
												parent.getParent(), 
												Collections.<HierarchicalFieldValue> emptyList() );
		}
	}
	
	public List<RestfulHierarchicalFieldValue> getChildren() {
		final List<RestfulHierarchicalFieldValue> children = 
				new ArrayList<RestfulHierarchicalFieldValue>();
		for( HierarchicalFieldValue child : childValues ) {
			children.add( 
					new RestfulHierarchicalFieldValue( child, 
											value, 
											Collections.<HierarchicalFieldValue> emptyList() ) );
		}
		return children;
	}
	
	public String getPath() {
		return value.getPath();
	}

}
