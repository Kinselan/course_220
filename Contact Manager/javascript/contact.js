$(function() {
  var contacts = JSON.parse(localStorage.getItem("contacts")) || [],
      $list = $("#list"),
      listing = Handlebars.compile($("#lists").html()),
      searchTerm, 
      tempContacts,
      tempCategories,
      categories = [];

  Handlebars.registerPartial($list.attr("id"), $list.html());

  $("main").find("#toolbar").slideDown();
  $("#toolbar").after(listing({ lists: contacts }));

  $("main").on("click", ".add", function(e) {
    e.preventDefault();
    hideMain();
    $(".submit").slideDown();  
  });

  $("main").on("submit", ".submit", function(e) {
    e.preventDefault();
    var contact = getContact($(this));
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    resetForm();
    $(".submit").hide();
    showMain();
  });

  $("main").on("click", "#delete", function(e) {
    e.preventDefault();
    var idx = findParentList(e);
    contacts.splice(idx, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    showMain();
  });

  $("main").on("click", "#edit", function(e) {
    e.preventDefault();
    var idx = findParentList(e);
    hideMain();
    $(".edit").slideDown();
    prepopulateForm($(".edit"), idx);

    $(".edit").on("submit", function(e) {
      e.preventDefault();
      var contact = getContact($(this));
      contacts.splice(idx, 1, contact);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      $(".edit").hide();
      showMain();
    });
  });

  $("main").on("click", ".cancel", function(e) {
    resetForm();
    $("form").hide();
    showMain();
  })

  $("main").on("keyup", "#search", function(e) {
    searchTerm = $(e.target).val();
    if (searchTerm.length > 0) {
      tempContacts = createTempContacts(searchTerm);
      if (tempContacts.length > 0) {
        replaceMainContact(tempContacts);
      } else {
        var $div = $("<div/>", {
          class: "contacts panel"
        });
        $div.append("<p>There is no contact starting with <strong>" + searchTerm + "</strong>.</p>");
        $("main").find(".list, .contacts").replaceWith($div);
      }
    } else {
      replaceMainContact(contacts);
    }
  });

  $("#toolbar").on("change", ":checkbox", function(e) {
    var category = $(e.target).val(),
        state = $(e.target).is(":checked"),
        idx;

    if (state) {
      categories.push(category);
    } else {
      idx = categories.indexOf(category);
      categories.splice(idx, 1);
    }

    if (categories.length > 0) {
      tempCategories = createTempCategory(categories);
      if (tempCategories.length > 0) {
        replaceMainContact(tempCategories);
      } else {
        var $div = $("<div/>", {
          class: "contacts panel"
        });
        $div.append("<p>There is no contact with the category of <strong>" + category + "</strong>.</p>");
        $("main").find(".list, .contacts").replaceWith($div);        
      }
      
    } else {
      replaceMainContact(contacts);
    }
  });

  function replaceMainContact(contactList) {
    $("main").find(".list, .contacts").replaceWith(listing({ lists: contactList }));
  }

  function findParentList(e) {
    return $(e.target).closest("li").index();
  }

  function prepopulateForm($form, idx) {
    var contact = contacts[idx];
    $form.find("input[name='name']").val(contact.name);
    $form.find("input[name='email']").val(contact.email);
    $form.find("input[name='phone']").val(contact.phone);
    contact.tags.forEach(function(tag) {
      $form.find("[value='"+ tag +"']").prop("checked", true);
    });
  }

  function createTempCategory(categories) {
    return contacts.filter(function(item) {
      var tags = item.tags;
      return tags.some(function(tag) {
        return categories.includes(tag);
      })
    })
  }

  function createTempContacts(searchTerm) {
    return contacts.filter(function(item) {
      return item.name.indexOf(searchTerm) !== -1;
    });
  }

  function getContact($form) {
    tags = [];
    $form.find(":checked").each(function(idx, input) {
      tags.push(input.getAttribute("value"));
    });

    return {
      name: $form.find("input[name='name']").val(),
      email: $form.find("input[name='email']").val(),
      phone: $form.find("input[name='phone']").val(),
      tags: tags
    }    
  }

  function hideMain() {
    $("main").find("#toolbar, .list, .contacts").slideUp();    
  }

  function showMain() {
    $("main").find("#toolbar").slideDown();
    replaceMainContact(contacts)
  }

  function resetForm() {
    $("form").find("input[type='text']").val("");
    $("form").find(":checkbox").prop("checked", false);
  }
});

