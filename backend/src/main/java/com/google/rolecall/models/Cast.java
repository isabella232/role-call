package com.google.rolecall.models;

import com.google.rolecall.jsonobjects.CastInfo;
import com.google.rolecall.jsonobjects.CastMemberInfo;
import com.google.rolecall.restcontrollers.exceptionhandling.RequestExceptions.InvalidParameterException;
import java.awt.Color;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class Cast {
  
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Basic
  private String comments;

  @Column(nullable = false)
  private Integer color;

  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  private Position position;

  @OneToMany(mappedBy = "cast", 
      cascade = CascadeType.ALL, 
      orphanRemoval = true,
      fetch = FetchType.EAGER)
  private List<CastMember> members = new ArrayList<>();

  public Integer getId() {
    return id;
  }
  
  public String getName() {
    return name;
  }

  public String getComments() {
    return comments == null? "" : comments;
  }

  public String getColor() {
    return String.format("#%s", Integer.toHexString(color).toUpperCase());
  }

  public Position getPosition() {
    return position;
  }

  public List<CastMember> getCastMembers() {
    return members;
  }

  public void addCastMember(User user) throws InvalidParameterException {
    CastMember member = new CastMember(user, this);
    members.add(member);
  }

  public void removeCastMember(CastMember member) {
    member.setCast(null);
    members.remove(member);
  }

  void setPosition(Position position) {
    this.position = position;
  }

  public Builder toBuilder() {
    return new Builder(this);
  }

  public CastInfo toCastInfo() {
    List<CastMemberInfo> membersInfo = members.stream().map(c->c.toCastMemberInfo())
        .collect(Collectors.toList());
  
    return CastInfo.newBuilder()
        .setId(id)
        .setName(name)
        .setComments(getComments())
        .setPositionId(position.getId())
        .setColor(getColor())
        .setMembers(membersInfo)
        .build();
  }

  public Cast() {
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  public static class Builder {

    private Cast cast;
    private String name;
    private String comments;
    private String color;

    public Builder setName(String name) {
      if(name != null) {
        this.name = name;
      }
      return this;
    }

    public Builder setComments(String comments) {
      if(comments != null) {
        this.comments = comments;
      }
      return this;
    }

    public Builder setColor(String color) {
      if(color != null) {
        this.color = color;
      }
      return this;
    }

    public Cast build() throws InvalidParameterException {
      if(name == null || color == null) {
        throw new InvalidParameterException("Cast requires a name and a color");
      }
      try {
        Color converted = Color.decode(color);
        cast.color = converted.getRGB() & 0xFFFFFF;
      } catch(NumberFormatException e) {
        throw new InvalidParameterException(
            "Cast color should have RGB format ranging from '#000000' to '#FFFFFF'.");
      }
      cast.name = this.name;
      cast.comments = this.comments;

      return cast;
    }

    public Builder(Cast cast) {
      this.cast = cast;
      this.name = cast.name;
      this.comments = cast.comments;
      this.color = cast.getColor();
    }

    public Builder() {
      cast = new Cast();
    }
  }
}
