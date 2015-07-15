## SQL views for bantrs models

### Room View
CREATE VIEW view_room AS
SELECT 		r.rid, r.title, r.lat, r.lng, r.radius, r.topic AS "content", r.topic_type AS "type", r.createdat AS "createdAt",
			u.uid, u.username, u.email,
			COUNT(m.uid) AS "members"
FROM 		rooms r, users u, membership m
WHERE		r.author = u.uid
AND			r.rid 	 = m.rid
GROUP BY 	r.rid, u.uid

### Comment View
CREATE VIEW view_room AS
SELECT 		c.cid, c.createdat AS "createdAt", c.comment,
			r.rid, r.title, r.lat, r.lng,
			u.uid, u.username, u.email
FROM 		comments c, users u, rooms r
WHERE		c.rid = r.rid
AND			c.author = u.uid
