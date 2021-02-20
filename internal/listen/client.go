package listen

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

const listenAPIKey = "X-ListenAPI-Key"

// Client for interacting with the Listen API
type Client struct {
	client       *http.Client
	host, apiKey string
}

// NewClient for initializing a Client struct
func NewClient(host, apiKey string) *Client {
	return &Client{
		client: &http.Client{},
		host:   host,
		apiKey: apiKey,
	}
}

func (c *Client) newHTTPRequest(path string, payload interface{}) (*http.Request, error) {
	path = strings.Trim(path, "/")
	uri := fmt.Sprintf("%s/%s", c.host, path)
	if payload != nil {
		b, err := json.Marshal(payload)
		if err != nil {
			return nil, fmt.Errorf("error marshaling request params: %v", err)
		}

		var m map[string]string
		if err := json.Unmarshal(b, &m); err != nil {
			return nil, fmt.Errorf("error unmarshaling request params: %v", err)
		}
		var params []string
		for k, v := range m {
			params = append(params, fmt.Sprintf("%s=%s", k, v))
		}
		uri = fmt.Sprintf("%s?%s", uri, strings.Join(params, "&"))
	}
	req, err := http.NewRequest(http.MethodGet, uri, nil)
	if err != nil {
		return nil, fmt.Errorf("error generating request: %v", err)
	}
	req.Header.Add(listenAPIKey, c.apiKey)
	return req, nil
}

func (c *Client) get(path string, payload interface{}) ([]byte, error) {
	req, err := c.newHTTPRequest(path, payload)
	if err != nil {
		return nil, err
	}

	//must use do in order to supply the api key to the header
	resp, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %v", err)
	}
	var b []byte
	if resp != nil {
		b, err = ioutil.ReadAll(resp.Body)
		resp.Body.Close()
	}

	if b == nil || err != nil || resp.StatusCode > 299 {
		return nil, fmt.Errorf("error making request -  bad/no response:\n\nRequest: %+v\n\nStatus: %s\n\nResponse: %v", req, resp.Status, string(b))
	}
	return b, nil
}
