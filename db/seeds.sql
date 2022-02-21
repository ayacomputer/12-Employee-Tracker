USE employees_db;
INSERT INTO department (name)
VALUES ("Marketing"),
("Tech"),
("Sales"),
("Management");


INSERT INTO role (title, salary, department_id)
VALUES ("Full Stack Developper", 100000,2),
       ("Data Analyst", 150000,2),
       ("Mobile App Developper", 100000,2),
       ("Assistant Store Manager", 90000,3),
       ("Retail Sales Consultant", 50000,3),
        ("Social Media Specialist", 50000,1),
         ("Director of Marketing", 95000,1),
          ("Director of Operations", 180000,4),
           ("Team Leader", 95000,4);

       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Minnie", "Mouse",1,null),
       ("Mickey", "Mouse",2,1),
       ("Donald", "Duck",3,2),
       ("Daisy", "Duck",4,3),
       ("Cruella", "De Vill",5,4),
       ("Tinker", "Bell",4,5),
       ("Winnie", "The Pooh",3,6),
       ("Snow", "White",2,7),
       ("Mike", "Wazowskki",1,8),
        ("Queen", "Elsa",3,9),
        ("Peter", "Pan",8,10),
         ("Mad", "Hatter",2,11),
        ("Buzz", "Lightyear",1,12),
       ("Walt", "Disney",7,13);
       
