# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Accounts(models.Model):
    username = models.TextField(primary_key=True, db_collation="NOCASE,")
    password = models.TextField()
    email = models.TextField()
    email_password = models.TextField()
    user_agent = models.TextField()
    active = models.BooleanField()
    locks = models.TextField()
    headers = models.TextField()
    cookies = models.TextField()
    proxy = models.TextField(blank=True, null=True)
    error_msg = models.TextField(blank=True, null=True)
    stats = models.TextField()
    last_used = models.TextField(blank=True, null=True)
    field_tx = models.TextField(db_column="_tx", blank=True, null=True)  # Field renamed because it started with '_'.

    class Meta:
        managed = False
        db_table = "accounts"
