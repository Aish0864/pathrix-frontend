const links = {
  0: {
    docs: "https://docs.python.org/3/tutorial/introduction.html",
    w3: "https://www.w3schools.com/python/python_intro.asp",
    yt: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
  },
  1: {
    docs: "https://docs.python.org/3/tutorial/controlflow.html",
    w3: "https://www.w3schools.com/python/python_conditions.asp",
    yt: "https://www.youtube.com/watch?v=DZwmZ8Usvnk",
  },
  2: {
    docs: "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
    w3: "https://www.w3schools.com/python/python_for_loops.asp",
    yt: "https://www.youtube.com/watch?v=94UHCEmprCY",
  },
  3: {
    docs: "https://docs.python.org/3/tutorial/datastructures.html",
    w3: "https://www.w3schools.com/python/python_lists.asp",
    yt: "https://www.youtube.com/watch?v=W8KRzm-HUcc",
  },
  4: {
    docs: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries",
    w3: "https://www.w3schools.com/python/python_dictionaries.asp",
    yt: "https://www.youtube.com/watch?v=daefaLgNkw0",
  },
  5: {
    docs: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
    w3: "https://www.w3schools.com/python/python_functions.asp",
    yt: "https://www.youtube.com/watch?v=9Os0o3wzS_I",
  },
  6: {
    docs: "https://docs.python.org/3/tutorial/classes.html",
    w3: "https://www.w3schools.com/python/python_classes.asp",
    yt: "https://www.youtube.com/watch?v=JeznW_7DlB0",
  },
  7: {
    docs: "https://docs.python.org/3/tutorial/errors.html",
    w3: "https://www.w3schools.com/python/python_try_except.asp",
    yt: "https://www.youtube.com/watch?v=NIWwJbo-9_8",
  },
  8: {
    docs: "https://docs.python.org/3/tutorial/modules.html",
    w3: "https://www.w3schools.com/python/python_modules.asp",
    yt: "https://www.youtube.com/watch?v=CqvZ3vGoGs0",
  },
  9: {
    docs: "https://docs.python.org/3/tutorial/stdlib.html",
    w3: "https://www.w3schools.com/python/python_file_handling.asp",
    yt: "https://www.youtube.com/watch?v=Uh2ebFW8OYM",
  },
};

export function getLinks(level) {
  return links[level] || links[0];
}
