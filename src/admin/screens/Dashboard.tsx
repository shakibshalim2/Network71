import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
  api,
  type ContentRecord,
  type Module,
  type Page,
  type User,
} from "../api"
import { Empty, ErrorNotice, Icon, Loading } from "../Admin"
import {
  useResource,
  ResourceError,
  Pager,
  time,
  type DashboardData,
  type MediaItem,
  type Inquiry,
} from "./shared"
export function Dashboard() {
  const { data, error, loading, reload } =
    useResource<DashboardData>("admin/dashboard")
  if (loading) return <Loading />
  if (!data || error) return <ResourceError error={error} retry={reload} />
  return (
    <>
      <p className="adm-notice">
        Email notifications: {data.smtp_enabled ? "enabled" : "not configured"}{" "}
        · {data.mail_pending} pending · {data.mail_failed} failed. Enquiries are
        stored in Inbox. Failed delivery needs a configuration check by your
        server administrator.
      </p>
      <section className="adm-welcome">
        <div>
          <span className="adm-eyebrow">YOUR WEBSITE, IN ONE PLACE</span>
          <h2>
            Good work deserves
            <br />a clear story.
          </h2>
          <p>
            Keep your content current and turn completed work into your next
            conversation.
          </p>
          <Link className="adm-button" to="/admin/projects">
            <Icon name="plus" size={17} /> Manage projects
          </Link>
        </div>
        <div className="adm-welcome-art" aria-hidden="true">
          <div className="adm-art-orbit" />
          <div className="adm-art-card">
            <span>NETWORK71</span>
            <Icon name="check" size={38} />
            <strong>Ready for your next update.</strong>
          </div>
        </div>
      </section>
      <div className="adm-stat-grid">
        {[
          {
            label: "Content items",
            value: data.total,
            icon: "content",
            to: "content",
          },
          {
            label: "Published",
            value: data.published,
            icon: "check",
            to: "content",
          },
          {
            label: "Drafts & changes",
            value: data.drafts,
            icon: "projects",
            to: "content",
          },
          {
            label: "New enquiries",
            value: data.inquiries,
            icon: "inbox",
            to: "inquiries",
          },
          {
            label: "New applications",
            value: data.applications,
            icon: "inbox",
            to: "applications",
          },
        ].map((item) => (
          <Link className="adm-stat" key={item.label} to={`/admin/${item.to}`}>
            <span>
              {item.label}
              <Icon name={item.icon} />
            </span>
            <strong>{item.value}</strong>
            <small>
              Open workspace <Icon name="arrow" size={14} />
            </small>
          </Link>
        ))}
      </div>
      <div className="adm-dashboard-grid">
        <section className="adm-panel">
          <div className="adm-panel-heading">
            <h2>Recent activity</h2>
            <span className="adm-tag">Live workspace</span>
          </div>
          {data.activity.length ? (
            <ul className="adm-activity">
              {data.activity.map((item) => (
                <li key={item.id}>
                  <span className="adm-activity-dot" />
                  <div>
                    <strong>
                      {item.action.replace(/_/g, " ")} · {item.entity}
                    </strong>
                    <small>
                      {item.name || "System"} · {time(item.created_at)}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="A fresh start">
              Saved changes and publishing activity will appear here.
            </Empty>
          )}
        </section>
        <section className="adm-panel adm-next">
          <span className="adm-eyebrow">BUILD YOUR WEBSITE</span>
          <h2>Start with what matters.</h2>
          <Link to="/admin/pages">
            <span>01</span>
            <div>
              <strong>Website pages</strong>
              <small>Organise your story and page copy.</small>
            </div>
            <Icon name="arrow" />
          </Link>
          <Link to="/admin/media">
            <span>02</span>
            <div>
              <strong>Real images</strong>
              <small>Add photos approved for public use.</small>
            </div>
            <Icon name="arrow" />
          </Link>
          <Link to="/admin/inquiries">
            <span>03</span>
            <div>
              <strong>New conversations</strong>
              <small>Review messages from your website.</small>
            </div>
            <Icon name="arrow" />
          </Link>
        </section>
      </div>
      <div className="adm-notice">
        <strong>Publishing is connected.</strong> Page sections and all active
        collections update their matching public presentation after owner
        approval. Use preview to review page drafts before publishing.
      </div>
    </>
  )
}
