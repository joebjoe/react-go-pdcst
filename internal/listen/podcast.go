package listen

import (
	"context"
	"encoding/json"
)

const (
	pathGetBestPodcasts = "best_podcasts"
)

// Podcast ...
type Podcast struct {
	ID                    string             `json:"id,omitempty"`
	RSS                   string             `json:"rss,omitempty"`
	Type                  string             `json:"type,omitempty"`
	Email                 string             `json:"email,omitempty"`
	Extra                 *PodcastExtra      `json:"extra,omitempty"`
	Image                 string             `json:"image,omitempty"`
	Title                 string             `json:"title,omitempty"`
	Country               string             `json:"country,omitempty"`
	Website               string             `json:"website,omitempty"`
	Language              string             `json:"language,omitempty"`
	GenreIDs              []int              `json:"genre_ids,omitempty"`
	ITunesID              int                `json:"itunes_id,omitempty"`
	Publisher             string             `json:"publisher,omitempty"`
	Thumbnail             string             `json:"thumbnail,omitempty"`
	IsClaimed             bool               `json:"is_claimed,omitempty"`
	Description           string             `json:"description,omitempty"`
	LookingFor            *PodcastLookingFor `json:"looking_for,omitempty"`
	ListenScore           int                `json:"listen_score,omitempty"`
	TotalEpisodes         int                `json:"total_episodes,omitempty"`
	ListenNotesURL        string             `json:"listennotes_url,omitempty"`
	ExplicitContent       bool               `json:"explicit_content,omitempty"`
	LatestPubDateMS       int                `json:"latest_pub_date_ms,omitempty"`
	EarliestPubDateMS     int                `json:"earliest_pub_date_ms,omitempty"`
	ListenScoreGlobalRank string             `json:"listen_score_global_rank,omitempty"`
}

// PodcastExtra ...
type PodcastExtra struct {
	URL1            string `json:"url1,omitempty"`
	URL2            string `json:"url2,omitempty"`
	URL3            string `json:"url3,omitempty"`
	GoogleURL       string `json:"google_url,omitempty"`
	SpotifyURL      string `json:"spotify_url,omitempty"`
	YouTubeURL      string `json:"youtube_url,omitempty"`
	LinkedInURL     string `json:"linkedin_url,omitempty"`
	WeChatHandle    string `json:"wechat_handle,omitempty"`
	PatreonHandle   string `json:"patreon_handle,omitempty"`
	TwitterHandle   string `json:"twitter_handle,omitempty"`
	FacebookHandle  string `json:"facebook_handle,omitempty"`
	InstagramHandle string `json:"instagram_handle,omitempty"`
}

// PodcastLookingFor ...
type PodcastLookingFor struct {
	Guests         bool `json:"guests,omitempty"`
	CoHosts        bool `json:"cohosts,omitempty"`
	Sponsors       bool `json:"sponsors,omitempty"`
	CrossPromotion bool `json:"cross_promotion,omitempty"`
}

// GetBestPodcastsRequest ...
type GetBestPodcastsRequest struct {
	Genre    int    `json:"genre_id,omitempty"`
	Page     int    `json:"page,omitempty"`
	Region   string `json:"region,omitempty"`
	SafeMode int    `json:"safe_mode,omitempty"`
}

// GetBestPodcastsResponse ...
type GetBestPodcastsResponse struct {
	ID       int        `json:"id"`
	Name     string     `json:"name,omitempty"`
	Total    int        `json:"total,omitempty"`
	HasNext  bool       `json:"has_next"`
	Podcasts []*Podcast `json:"podcasts,omitempty"`
}

// GetBestPodcasts ...
func (c *Client) GetBestPodcasts(ctx context.Context, req *GetBestPodcastsRequest) (*GetBestPodcastsResponse, error) {
	data, err := c.get(pathGetBestPodcasts, req)
	if err != nil {
		return nil, err
	}
	var resp *GetBestPodcastsResponse
	err = json.Unmarshal(data, resp)
	return resp, err
}
